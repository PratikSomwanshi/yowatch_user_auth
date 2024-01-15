const { Logger } = require("../config");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const Strings = require("../utils/strings/airplane.string");

async function createAirplane(req, res) {
    try {
        const response = await AirplaneService.createAirplane(req.body);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplane(req, res) {
    try {
        const response = await AirplaneService.getAirplane(req.params.id);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllAirplane(req, res) {
    try {
        const response = await AirplaneService.getAllAirplane(req.body.id);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req, res) {
    try {
        const response = await AirplaneService.updateAirplane(
            req.body,
            req.params.id
        );
        Logger.info(Strings.CRATED);

        SuccessResponse.message = "successfully updated the airplane";
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirplane(req, res) {
    try {
        const response = await AirplaneService.deleteAirplane(req.params.id);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = "successfully deleted the airplane";
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplane,
    getAllAirplane,
    deleteAirplane,
    updateAirplane,
};
