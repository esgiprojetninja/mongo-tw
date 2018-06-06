const mongoose = require("mongoose");
const { getCollectionName } = require("../../db/schema/rabbits");

const rabbitSchema = new mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    city: {
        type: String
    },
    diet: {
        type: String
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    }
});

module.exports = mongoose.model(getCollectionName(), rabbitSchema);
