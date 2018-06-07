const mongoose = require("mongoose");

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

module.exports = rabbitSchema;
