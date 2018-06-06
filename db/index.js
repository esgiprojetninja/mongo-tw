require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");
const globals = require("../utils/consts");
const rabbits = require("./schema/rabbits");
const twitterApi = require("../api/resources/twitter/main");

const isConnectionEstablished = () => mongoose.connection && mongoose.connection.host && mongoose.connection.port;

const connect = () => {
    if ( process.env.NODE_ENV === require("../utils/consts").testEnv) {
        return;
    }
    if (isConnectionEstablished()) return;
    mongoose.connect(`mongodb:${process.env.DB_PATH}`, {
        autoReconnect: true
    });
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "DB Connection error:: "));
    db.once("open", () => {
        console.warn("Mongoose connected !");
        if (process.env.NODE_ENV !== globals.testEnv) {
            rabbits.reset();
            twitterApi.initTwitterConnection();
        }
    });
};

module.exports = {
    connect
};
