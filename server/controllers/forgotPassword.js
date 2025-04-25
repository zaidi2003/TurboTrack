const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const forgotPassword = async (req, res) => 
{
    const {email} = req.body;

    if (email === undefined)
    {
        return res.status(400).json({msg: "Please provide an email"});
    }

    try 
    {
        const user = await User.findOne({email});

        if (!user)
        {
            return res.status(404).json({msg: "User not found"});
        }

        const resetToken = crypto.randomBytes(32).toString('hex');

        user.passwordResetToken = resetToken;
        user.passwordResetExpiration = Date.now() + 10 * 60 * 1000; // expires after 10 mins
        await user.save();

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "turbotrack360@gmail.com",
                pass: "doqg zrju cprz qemj"
            },
        });

        const mailOptions = {
            from: "turbotrack360@gmail.com",
            to: email,
            subject: 'Password Reset',
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({msg: "A Password reset link has been sent to your email"});
    }

    catch (error)
    {
        console.error("Error sending email:", error);
        res.status(500).json({msg: "Internal server error!"});
    }
};

const resetPassword = async (req, res) =>
{
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword)
    {
        return res.status(400).json({msg: "Please provide a new password"});
    }

    if (!token)
    {
        return res.status(400).json({msg: "Please provide a token"});
    }

    try
    {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpiration: { $gt: Date.now() },
        });

        if (user === null)
        {
            return res.status(400).json({msg: "Invalid or expired token"});
        }   
        
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpiration = undefined;
        await user.save();

        res.status(200).json({msg: "Password reset successfully"});
    }

    catch (error)
    {
        console.error("Error resetting password:", error);
        res.status(500).json({msg: "Internal server error"});
    }
};

module.exports = {
    forgotPassword,
    resetPassword
};