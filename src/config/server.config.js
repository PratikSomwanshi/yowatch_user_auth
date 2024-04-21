const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.PASSWORD,
    MONGO_URL: process.env.MONGO_URL,
    RESEND_API: process.env.RESEND_API,
};
