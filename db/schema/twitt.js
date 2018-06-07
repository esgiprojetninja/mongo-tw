const { createCollection } = require("../utils/collectionTools");
const twitterApi = require("../../api/resources/twitter/main");
const schema = require("../../api/models/Twitt");
const COLLECTION_NAME = "Twitts";
let COLLECTION = null;

const upsert = (twitts, keyword) => {
    if (twitts.statuses && Array.isArray(twitts.statuses)) {
        twitts.statuses.forEach(twitt => {
            const data = {
                ...twitt,
                $addToSet: {
                    big_data_keywords: [keyword]
                }
            };
            // mongo.collection.update({'Charlie Brown'}, {$addToSet:{companies: ['yui']}}, {upsert: true})
            COLLECTION.update({ id_str: data.id_str }, data, { upsert: true },
                function (err) {
                    // console.log("upserting", data);
                    if (err) {
                        const id = data && data.id_str ? data.id_str : "NO_ID";
                        console.warn(`could not upsert twitt ${id}`, err);
                    }
                });
        });
    }
};

const seed = async () => {
    try {
        const client = await twitterApi.getTwitterClient();
        upsert(await client.get("search/tweets", { q: "JavaScript" }), "Javascript");
        upsert(await client.get("search/tweets", { q: "Php" }), "Php");
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
