const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, "Please provide an userName"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please provide an email address"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
