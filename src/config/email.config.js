const nodemailer = require("nodemailer");

const { EMAIL, EMAIL_PASSWORD } = require("../config").ServerConfig;

const mailSender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

module.exports = mailSender;
