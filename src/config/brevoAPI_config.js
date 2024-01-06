var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY_BREVO


// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';



var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = apiInstance