const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/error/AppError");
const { ErrorResponse } = require("../utils/common");

function signInMiddleware(req, res, next) {
    try {
        if (!req.body.email) {
            throw new AppError(
                "Email not present in upcoming request",
                StatusCodes.BAD_REQUEST
            );
        }

        if (!req.body.password) {
            throw new AppError(
                "Password not present in upcoming request",
                StatusCodes.BAD_REQUEST
            );
        }

        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    signInMiddleware,
};
