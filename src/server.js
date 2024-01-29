const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const connectDB = require("./config/mongoDB.config");

const app = express();

app.use(cors());
app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`server running on port ${ServerConfig.PORT}`);
    await connectDB();
});
