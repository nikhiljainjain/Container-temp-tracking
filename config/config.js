const config = {
    database : process.env.DATABASE,
    twilio_accountSid : process.env.Twilio_Account_Sid, 
    twilio_authToken : process.env.Twilio_Auth_Token,
    aerisapi_access_id : process.env.Aerisapi_Access_Id, 
    aerisapi_secret_key : process.env.Aerisapi_Secret_Key,
    whatsapp_sender : process.env.Twilio_Whatsapp_Sender,
    whatsapp_recevier : process.env.Twilio_Whatsapp_Recevier
};

module.exports = config;