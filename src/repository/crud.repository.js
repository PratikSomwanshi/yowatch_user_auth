const { StatusCodes } = require("http-status-codes");

const AppError = require("../utils/error/AppError");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async update(data) {
        const user = await this.model.findOne({ email: data.email });

        if (!user) {
            throw new AppError("user not defined", StatusCodes.BAD_REQUEST);
        }

        if (user.cart.length == 5) {
            throw new AppError("cart is full", StatusCodes.BAD_REQUEST);
        }

        //
        let currentData = [];
        if (user.cart.length >= 1) {
            const arr = user.cart.toString();
            currentData = arr.split(",");
        }

        currentData.push(data.data);

        const response = await this.model.findOneAndUpdate(
            {
                email: data.email,
            },
            {
                cart: currentData,
            }
        );
        return response;
    }

    async delete(data) {
        const user = await this.model.findOne({ email: data.email });

        if (!user) {
            throw new AppError("user not found", StatusCodes.NOT_FOUND);
        }

        if (user.cart.length == 0) {
            throw new AppError("cart is empty", StatusCodes.BAD_REQUEST);
        }

        // const currentData = user.cart;
        // currentData.splice(data.index, 1);

        const currentData = user.cart.filter(
            (item) => item.toString() !== data.id
        );
        console.log(currentData);

        const response = await this.model.findOneAndUpdate(
            {
                email: data.email,
            },
            {
                cart: currentData,
            }
        );
        return response;
    }

    async getCart({ email }) {
        const response = await this.model.findOne({ email });
        return response.cart;
    }
}

module.exports = CrudRepository;
