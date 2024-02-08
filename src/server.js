const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const connectDB = require("./config/mongoDB.config");
const { scheduleCron } = require("./utils/cron/deleteOtp.cron");
const { User } = require("./models");

const app = express();

app.use(cors());
app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("/", async (req, res) => {
    const user = await User.findOne({ email: "pratiksomwanshi570@gmail.com" });

    const response = await User.aggregate([
        {
            $match: {
                email: "ram@ram.com",
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "cart",
                foreignField: "_id",
                as: "cart_data",
            },
        },
    ]);

    return res.json(response);
});

app.listen(ServerConfig.PORT, async () => {
    console.log(`running on port ${ServerConfig.PORT}`);
    await connectDB();
    scheduleCron();
});
