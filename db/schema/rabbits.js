const fs = require("fs");
const { emptyCollection, createCollection } = require("../utils/collectionTools");
const schema = require("../../api/models/Rabbit");
const COLLECTION_NAME = "Rabbits";
let COLLECTION = null;

const seed = () => {
    JSON.parse(fs.readFileSync("rabbits_data.json", "utf8")).forEach(async (rabbit) => {
        const todo = new COLLECTION({ ...rabbit });
        await todo.save();
    });
    console.warn(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    async reset() {
        await emptyCollection(COLLECTION_NAME);        
        COLLECTION = createCollection(COLLECTION_NAME, schema);
        seed();
    },
    getCollectionName() {
        return COLLECTION_NAME;
    },
    getCollection() {
        return COLLECTION;
    }
};
