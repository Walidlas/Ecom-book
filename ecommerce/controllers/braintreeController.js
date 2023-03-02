const braintree = require("braintree");
const { expression } = require("joi");

require("dotenv").config(); 

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHAND_ID,    
  publicKey: process.env.BRAINTREE_PUBLIC_KEY, 
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,  
});

exports.generateToken = (req, res) => {

    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            return res.status(500).json({ error: err})
        }
        res.json({token: response.clientToken});
      });
}

exports.processPayment = (req, res) => {

     const { amount, paymentMethodNonce } = req.body;

     console.log(req.body)

     gateway.transaction.sale({
        amount, 
        paymentMethodNonce, 
        options: {
            submitForSettlement: true,
        }
     }, (err, result) => {
         if(err) {
          return res.status(500).send(err)
         }

         res.send(result)
     })

}

