let  CryptoJS =  require('crypto-js/crypto-js') 
let  config = require('./config.js');
let sign = function(timestamp, type, apiUrl) {
   return  CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + type + apiUrl, config.api_secret_key))
}

module.exports= sign;