const nodemailer = require("nodemailer");
const serverConfig = require("./server.config");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: serverConfig.EMAIL,
        pass: serverConfig.EMAIL_PASSWORD,
    },
});

module.exports = transporter;
