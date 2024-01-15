const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repository");
const AppError = require("../utils/error/AppError");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const response = await airplaneRepository.create(data);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function getAirplane(id) {
    try {
        const response = await airplaneRepository.get(id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function getAllAirplane() {
    try {
        const response = await airplaneRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function updateAirplane(data, id) {
    try {
        const response = await airplaneRepository.update(data, id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.delete(id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    createAirplane,
    getAirplane,
    getAllAirplane,
    updateAirplane,
    deleteAirplane,
};
