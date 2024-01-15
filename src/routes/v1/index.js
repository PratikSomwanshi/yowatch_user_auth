const router = require("express").Router();

const airplaneRoute = require("./airplane.route");

router.use("/airplanes", airplaneRoute);

module.exports = router;
