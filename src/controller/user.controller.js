const { StatusCodes } = require("http-status-codes");
const { userServices } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const moment = require("moment/moment");
const { OTP } = require("../models");

async function createUser(req, res) {
    try {
        const response = await userServices.createUser({
            email: req.body.email,
            password: req.body.password,
        });

        SuccessResponse.data = {
            email: response.email,
            cart: response.cart,
        };
        SuccessResponse.message = "successfully created the user";

        try {
            await OTP.findOneAndDelete({
                email: req.body.email,
            });
        } catch (error) {
            console.log(error);
        }
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function signIn(req, res) {
    try {
        const response = await userServices.signIn({
            email: req.body.email,
            password: req.body.password,
        });
        // return res.status(StatusCodes.OK).json({
        //     msg: response,
        // });

        SuccessResponse.data = response;

        try {
            await OTP.findOneAndDelete({
                email: req.body.email,
            });
        } catch (error) {
            console.log(error);
        }

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        // return res.status(StatusCodes.BAD_REQUEST).json({
        //     msg: error,
        // });
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function authorization(req, res) {
    try {
        const response = await userServices.authorization({
            token: req.body.token,
        });
        return res.status(StatusCodes.OK).json({
            valid: true,
            init: moment(response.iat),
            now: moment(),
            expire: moment(response.exp),
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            valid: false,
        });
    }
}

async function otpSend(req, res) {
    try {
        await userServices.sendOtp({
            email: req.body.email,
        });

        SuccessResponse.data = "Successfully sended the OTP";
        // SuccessResponse.data = response.explanation.errno;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function otpMailVerify(req, res) {
    try {
        const response = await userServices.otpMailVerify({
            otp: req.body.otp,
            email: req.body.email,
        });
        SuccessResponse.data = response;

        try {
            await OTP.findOneAndDelete({
                email: req.body.email,
            });
        } catch (error) {
            console.log(error);
        }

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
    otpSend,
    otpMailVerify,
};
