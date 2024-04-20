module.exports = {
    ServerConfig: require("./server.config"),
    Logger: require("./logger.config"),
    connectDB: require("./mongoDB.config"),
    resend: require("./email.config"),
};
