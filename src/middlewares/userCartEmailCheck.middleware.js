const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/AppError");
const { StatusCodes } = require("http-status-codes");

function checkEmail(req, res, next) {
    try {
        if (!req.body.email) {
            throw new AppError("Email not found", StatusCodes.BAD_REQUEST);
        }

        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    checkEmail,
};
