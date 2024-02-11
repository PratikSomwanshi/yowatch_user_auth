const { StatusCodes } = require("http-status-codes");
const { userServices } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

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

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        // return res.status(StatusCodes.BAD_REQUEST).json({
        //     msg: error,
        // });
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updateUserCart(req, res) {
    try {
        const response = await userServices.updateUserCart({
            email: req.body.email,
            data: req.body.productId,
        });

        SuccessResponse.data = {
            email: response.email,
            cart: response.cart,
        };
        // SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the user";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deleteUserCart(req, res) {
    try {
        const response = await userServices.deleteUserCart({
            email: req.body.email,
            id: req.body.id,
        });

        SuccessResponse.data = {
            email: response.email,
            cart: response.cart,
        };
        // SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the user";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getCart(req, res) {
    try {
        const response = await userServices.getCart({
            email: req.body.email,
        });

        // SuccessResponse.data = {
        //     email: response.email,
        //     cart: response.cart,
        // };
        SuccessResponse.data = response;
        SuccessResponse.message = "successfully fetch the user";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

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
    updateUserCart,
    deleteUserCart,
    getCart,
    otpSend,
    otpMailVerify,
};
