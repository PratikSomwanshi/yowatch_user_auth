const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const CrudRepository = require("./crud.repository");
const { User, OTP } = require("../models");
const mailSender = require("../config/email.config");
const { ServerConfig } = require("../config");
const AppError = require("../utils/error/AppError");

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async signIn(data) {
        try {
            const user = await User.findOne({ email: data.email });
            if (!user) throw Error("user not found");

            const validPass = bcrypt.compareSync(data.password, user.password);

            if (validPass) {
                return user;
            } else {
                throw Error("password does not match");
            }
        } catch (error) {
            throw error;
        }
    }

    nodeMail(email, otp) {
        return mailSender.sendMail({
            from: ServerConfig.EMAIL,
            to: email,
            subject: "OTP",
            text: `Your OTP is ${otp}`,
        });
    }

    async otpMail(otp, email) {
        try {
            const otpEmail = await OTP.findOne({ email });

            let response;
            if (otpEmail && otpEmail.otpSendCount >= 3) {
                throw new AppError(
                    "Max OTP retry, Retry after 15 min",
                    StatusCodes.BAD_REQUEST
                );
            }

            try {
                await this.nodeMail(email, otp);
            } catch (error) {
                throw new AppError(
                    "Failed to send the mail",
                    StatusCodes.BAD_REQUEST
                );
            }

            if (!otpEmail) {
                response = await OTP.create({
                    email,
                    otp,
                });
            } else {
                response = await OTP.findOneAndUpdate(
                    {
                        email,
                    },
                    {
                        otp,
                        otpSendCount: ++otpEmail.otpSendCount,
                    }
                );
            }

            return response;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                return new AppError(error, StatusCodes);
            }
        }
    }

    async otpMailVerify(otp, email) {
        try {
            const otpEmail = await OTP.findOne({ email });

            if (!otpEmail)
                throw new AppError("No otp found", StatusCodes.BAD_REQUEST);

            if (otpEmail.status == "verified")
                throw new AppError(
                    "Email Already Verified",
                    StatusCodes.BAD_REQUEST
                );

            if (otpEmail.otp == otp) {
                await OTP.findOneAndUpdate(
                    {
                        email,
                    },
                    {
                        status: "verified",
                    }
                );

                return await OTP.findOne({ email });
            } else {
                throw new AppError(
                    "Verification Failed",
                    StatusCodes.BAD_REQUEST
                );
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError(error, StatusCodes.BAD_REQUEST);
            }
        }
    }
}

module.exports = UserRepository;
