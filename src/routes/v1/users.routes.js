const router = require("express").Router();

const { userController } = require("../../controller");
const { UserMiddleware, CartMiddleware } = require("../../middlewares");
const mailSender = require("../../config/email.config");
const { ServerConfig } = require("../../config");

router.post("/signup", userController.createUser);

router.post("/signin", UserMiddleware.signInMiddleware, userController.signIn);

router.post("/auth", userController.authorization);

router.put("/cart", CartMiddleware.checkEmail, userController.updateUserCart);

router.delete(
    "/cart",
    CartMiddleware.checkEmail,
    userController.deleteUserCart
);

router.post("/cart", CartMiddleware.checkEmail, userController.getCart);

router.post("/mail", userController.otpSend);

router.post("/mail/verify", userController.otpMailVerify);

module.exports = router;
