import dotenv from 'dotenv'

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    secret_jwt: process.env.SECRET_KEY_JWT,
    google_clientid: process.env.GOOGLE_CLIENT_ID,
    google_clientsecret: process.env.GOOGLE_CLIENT_SECRET,
    github_clientid: process.env.GITHUB_CLIENT_ID,
    github_clientsecret: process.env.GITHUB_CLIENT_SECRET,
    port: process.env.PORT,
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_password: process.env.NODEMAILER_PASSWORD,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
    twilio_whatsapp_number: process.env.TWILIO_WHATSAPP_NUMBER,
};
