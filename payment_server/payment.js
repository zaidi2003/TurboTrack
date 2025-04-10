const authenticatePayment = async (req, res) => {
    const { transactionId, amount, userId, cardNumber, cvc, expirationDate} = req.body;
  
    if (transactionId === null || amount === null || userId === null || cardNumber === null || cvc === null, expirationDate === null) 
    {
      return res.status(400).json({
        msg: "Please provide transactionId, amount, card number, and userId.",
      });
    }

    // if transaction amount >= 3500 then payment is valid
    const amountValid = amount >= 3500;

    // checking card number validity
    const cardNumberValid = /^[0-9]{16}$/.test(cardNumber);

    // checking cvc validity
    const cvcValid = /^[0-9]{3}$/.test(cvc);

    // checking expiration date validity
    const expirationDateValid = validateExpirationDate(expirationDate);

    if (!expirationDateValid)
    {
      // if format is invalid
      if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate) === false)
      {
        return res.status(400).json({
            msg: "Expiration date format is invalid. Please provide a valid expiration date.",
        });
      }

      else 
      {
        return res.status(400).json({
          msg: "Your card has expired.",
        });
      }
    }
    
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

    if (!cvcValid)
    {
        return res.status(400).json({
            msg: "CVC is invalid. Please provide a valid CVC.",
        });
    }
  
    if (amountValid && cardNumberValid && cvcValid) 
    {
      return res.status(200).json({
        msg: "Payment authenticated successfully",
        transactionId,
        amount,
        userId,
        cardNumber,
        cvc,
        expirationDate,
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
        cvc,
        expirationDate,
        status: "failed",
      });
    }
  };

  const validateExpirationDate = (expirationDate) => {
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!expirationRegex.test(expirationDate)) 
    {
      return false; 
    }

    const [month, year] = expirationDate.split('/').map(Number);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; 
    const currentMonth = currentDate.getMonth() + 1;

    if (currentYear > year || (currentYear === year && currentMonth > month)) 
    {
      return false;
    }

    else if (currentYear === year && currentMonth === month) 
    {
      return false;
    }

    else if (currentMonth === month && currentYear > year)
    {
      return false;
    }

    return true;
  };
  
  module.exports = {
    authenticatePayment,
    validateExpirationDate,
  };