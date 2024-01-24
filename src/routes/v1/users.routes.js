const router = require("express").Router();

const { userController } = require("../../controller");

router.post("/signup", userController.createUser);

router.post("/signin", userController.signIn);

router.post("/auth", userController.authorization);

module.exports = router;
