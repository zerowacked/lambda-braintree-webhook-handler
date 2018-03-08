# lambda-braintree-webhook-handler
A Lambda function that allows you to parse Braintree webhooks without maintaining your own server
#######################
Installation instructions:
1.) Download the lambda-braintree-webhook-handler code either as a zip or use git pull.
2.) Unpack the zip and/or open the folder
3.) In terminal use npm install to download the dependencies
4.) Re-zip the file
5.) Upload the file to your AWS Lambda function

Since you must upload your node_modules folder to AWS Lambda, you need to unzip, npm install, then re-zip and upload.

In your Lambda function, you will need to trigger the function by API Gateway. Once you've configured your AWS API,
you will receive an endpoint.

Add this endpoint to your Braintree webhooks settings in your Braintree control panel by navigating to:
1.) Log into https://www.braintreegateway.com/login
2.) Navigate to Settings > Webhooks
3.) Click Create New Webhook
4.) Select all triggers you wish to post to this endpoint
5.) Add your endpoint URL
6.) Click Create Webhook

This code is generic and will handle all webhooks. Once you've enabled the webhook URL in your Braintree control panel,
AND you've added all the code to your Lambda function, click "Check URL" on the Braintree webhooks page.

If you receive a 200 response, then your webhook is good to go! If you receive a 502, a number of issues could have gone wrong.

1.) Make sure you're not requiring authentication for your webhook endpoint, it must be publically accessible.
2.) Make sure you've set the METHOD of your webhook endpoint to POST or ANY
3.) Ensure that your API Keys are added as environment variables in the Lambda function
4.) Do not try to check this code using the "TEST" function in your Lambda admin screen--it requires details that the
    TEST function does not provide and it will "exit the process before completing."
5.) Make judicious use of console.log commands and check your Cloudwatch logs to see what is causing the error

Let me know if you have any ideas for improvement (that do not involve adding different libraries to do things with the data,
that's for the users of these webhooks to decide on their own).
