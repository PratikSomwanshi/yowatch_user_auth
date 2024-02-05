const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce_backend");
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;
