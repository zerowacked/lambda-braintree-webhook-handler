var braintree = require('braintree');
var queryString = require('query-string');

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId: process.env.merchantId, // These credentials must be entered in your Lambda function environt as keys and your merchantId, publicKey, and privateKey as values.
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey
});

exports.handler = (event, context, callback) => {
  const eventBody = queryString.parse(event['body']); // using queryString as node does not have an in-built parser for x-www-form-urlencoded data
  console.log(event);
  
  let data = {
    kind: null,
    message: null
  };
  
    gateway.webhookNotification.parse( // to do: implement promises in parse method instead of function callback
      eventBody.bt_signature,
      eventBody.bt_payload,
      function (err, webhookNotification) {
        if(err){
          console.log(err);
          data.err = "Error";
          data.message = err;
        }
        else if(webhookNotification){
          console.log(webhookNotification);
          data.kind = webhookNotification.kind;
          data.message = webhookNotification;
        }
        
        console.log(data); 
        /*
        This Lambda function uses console.log() to push the requests into AWS Cloudwatch for inspection later.
        If you are not using Cloudwatch or have your own logging software, feel free to replace the console.log() commands
        */

        let response = { // This is the response back to Braintree. It does not need to contain the data in the body. The body can be null, in fact.
          "statusCode": 200, // Braintree does require that you return a 200 response, however, in order to complete the webhook interaction.
          "headers": {
            "Content-Type": "application/json"
          },
          "body": null,
          "isBase64Encoded": false
        };
        
        callback(null, response);
      
      }
  );
};