const router = require("express").Router();

const { userController } = require("../../controller");
const { UserMiddleware } = require("../../middlewares");

router.post("/signup", userController.createUser);

router.post("/signin", UserMiddleware.signInMiddleware, userController.signIn);

router.post("/auth", userController.authorization);

router.put("/cart", userController.updateUserCart);

router.delete("/cart", userController.deleteUserCart);

module.exports = router;
