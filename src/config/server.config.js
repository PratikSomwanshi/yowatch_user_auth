const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};
