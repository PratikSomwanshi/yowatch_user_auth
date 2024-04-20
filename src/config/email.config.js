const { Resend } = require("resend");
const serverConfig = require("./server.config");

const resend = new Resend(serverConfig.RESEND_API);

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'bd8830759797@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });

module.exports = resend;
