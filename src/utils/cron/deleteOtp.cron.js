const cron = require("node-cron");

const { userServices } = require("../../services");

async function scheduleCron() {
    cron.schedule("*/15 * * * *", async function () {
        await userServices.deleteOldOtp();
        console.log("cron delete otp executed");
    });
}

module.exports = {
    scheduleCron,
};
