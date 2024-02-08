const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const moment = require("moment");
const { OTP, User } = require("../models");
const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repository");
const AppError = require("../utils/error/AppError");

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const response = await userRepository.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function signIn(data) {
    try {
        const response = await userRepository.signIn(data);

        const token = jwt.sign(
            {
                email: response.email,
                id: response._id,
            },
            "shhhhh",
            {
                expiresIn: "1h",
            }
        );

        let res = {};
        res.email = response.email;
        res.token = token;

        return res;
    } catch (error) {
        throw new AppError(error.message, error.statusCode);
    }
}

async function authorization(data) {
    try {
        const valid = jwt.verify(data.token, "shhhhh");

        if (!valid) throw new Error("token expired, please relogin");

        return valid;
    } catch (error) {
        throw error;
    }
}

async function updateUserCart(data) {
    try {
        const response = await userRepository.update(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function deleteUserCart(data) {
    try {
        const response = await userRepository.delete(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getCart({ email }) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError("User not found", StatusCodes.BAD_REQUEST);
        }

        const response = await User.aggregate([
            {
                $match: {
                    email,
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "cart",
                    foreignField: "_id",
                    as: "cart_data",
                },
            },
        ]);
        return response;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function sendOtp({ email }) {
    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        await userRepository.otpMail(otp, email);
    } catch (error) {
        //
        throw new AppError(error.explanation, error.statusCode);
    }
}

async function otpMailVerify({ otp, email }) {
    try {
        const response = await userRepository.otpMailVerify(otp, email);

        return response;
    } catch (error) {
        throw new AppError(error.explanation, error.statusCode);
    }
}

async function deleteOldOtp() {
    const five = new Date(moment().subtract("15", "minute"));

    try {
        await OTP.deleteMany({
            updatedAt: {
                $lt: five,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
    updateUserCart,
    deleteUserCart,
    getCart,
    sendOtp,
    deleteOldOtp,
    otpMailVerify,
};
