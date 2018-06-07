const { createCollection } = require("../utils/collectionTools");
const twitterApi = require("../../api/resources/twitter/main");
const schema = require("../../api/models/Twitt");
const COLLECTION_NAME = "Twitts";
let COLLECTION = null;

const upsert = (twitts) => {
    if (twitts.statuses && Array.isArray(twitts.statuses)) {
        twitts.statuses.forEach(twitt => {
            COLLECTION.update({ id_str: twitt.id_str }, twitt, { upsert: true },
                function (err) {
                    if (err) {
                        const id = twitt && twitt.id_str ? twitt.id_str : "NO_ID";
                        console.warn(`could not upsert twitt ${id}`, err);
                    }
                });
        });
    }
};

const seed = async () => {
    try {
        const client = await twitterApi.getTwitterClient();
        upsert(await client.get("search/tweets", { q: "JavaScript" }));
        upsert(await client.get("search/tweets", { q: "Php" }));
        console.warn(`Populated ${COLLECTION_NAME} Collection`);
    } catch (e) {
        console.warn(`Could not seed ${COLLECTION} collection`, e);
    }
};

module.exports = {
    async reset() {
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
