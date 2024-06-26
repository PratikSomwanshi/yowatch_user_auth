const router = require("express").Router();

const { userController } = require("../../controller");
const { UserMiddleware, CartMiddleware } = require("../../middlewares");
const mailSender = require("../../config/email.config");
const { ServerConfig } = require("../../config");

router.post("/signup", userController.createUser);

router.post("/signin", UserMiddleware.signInMiddleware, userController.signIn);

router.post("/auth", userController.authorization);

router.post("/mail", CartMiddleware.checkEmail, userController.otpSend);

router.post("/mail/verify", userController.otpMailVerify);

module.exports = router;
