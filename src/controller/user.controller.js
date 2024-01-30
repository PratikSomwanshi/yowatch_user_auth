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
        console.log(error);

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
        console.log(JSON.stringify(error));

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
        console.log(error);

        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deleteUserCart(req, res) {
    try {
        const response = await userServices.deleteUserCart({
            email: req.body.email,
            index: req.body.index,
        });

        SuccessResponse.data = {
            email: response.email,
            cart: response.cart,
        };
        // SuccessResponse.data = response;
        SuccessResponse.message = "successfully created the user";

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);

        ErrorResponse.message = error.message;
        ErrorResponse.error = error;

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function authorization(req, res) {
    try {
        console.log(req.body);
        const response = await userServices.authorization({
            token: req.body.token,
        });
        return res.status(StatusCodes.OK).json({
            valid: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            valid: false,
        });
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
    updateUserCart,
    deleteUserCart,
};
