const router = require("express").Router();

const { AirplaneController } = require("../../controller");
const { AirplaneMiddleware } = require("../../middlewares");

router.post("/", AirplaneController.createAirplane);

router.get("/", AirplaneController.getAllAirplane);

router.get("/:id", AirplaneController.getAirplane);

router.put(
    "/:id",
    AirplaneMiddleware.updateAirplane,
    AirplaneController.updateAirplane
);

router.delete("/:id", AirplaneController.deleteAirplane);

module.exports = router;
