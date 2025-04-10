const authenticatePayment = async (req, res) => {
    const { transactionId, amount, userId, cardNumber } = req.body;
  
    if (transactionId === null || amount === null || userId === null || cardNumber === null) 
    {
      return res.status(400).json({
        msg: "Please provide transactionId, amount, card number, and userId.",
      });
    }

    // if transaction amount >= 3500 then payment is valid
    const amountValid = amount >= 3500;

    // checking card number validity
    const cardNumberValid = /^[0-9]{16}$/.test(cardNumber);

    if (!amountValid)
    {
        return res.status(400).json({
            msg: "Transaction amount is invalid. One karting session costs 3500.",
        });
    }

    if (!cardNumberValid)
    {
        return res.status(400).json({
            msg: "Card number is invalid. Please provide a valid card number.",
        });
    }
  
    if (amountValid && cardNumberValid) 
    {
      return res.status(200).json({
        msg: "Payment authenticated successfully",
        transactionId,
        amount,
        userId,
        cardNumber,
        status: "success",
      });
    } 
    
    else 
    {
      return res.status(400).json({
        msg: "Payment authentication failed",
        transactionId,
        amount,
        userId,
        cardNumber,
        status: "failed",
      });
    }
  };
  
  module.exports = {
    authenticatePayment,
  };