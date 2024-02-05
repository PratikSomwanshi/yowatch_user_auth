const mongoose = require("mongoose");
const { ENUM } = require("../utils/common/Enums");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
        },
        otp: {
            type: Number,
            require: true,
        },
        status: {
            type: String,
            enum: ENUM.otpEnum,
            default: "pending",
        },
        otpSendCount: {
            type: Number,
            default: 1,
            max: 3,
        },
    },
    {
        timestamps: true,
    }
);

const otpModel = mongoose.model("otps", otpSchema);

module.exports = otpModel;
