const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/error/AppError");
const { ErrorResponse } = require("../utils/common");

function updateAirplane(req, res, next) {
    if (!req.body.capacity || !req.body.modelNumber) {
        if (!req.body.capacity) {
            ErrorResponse.error = {
                message: "capacity field is required.",
                statusCode: StatusCodes.BAD_REQUEST,
            };

            res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        } else {
            ErrorResponse.error = {
                message: "modelNumber can not be empty",
                statusCode: StatusCodes.BAD_REQUEST,
            };
            res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
    } else {
        next();
    }
}

module.exports = {
    updateAirplane,
};
