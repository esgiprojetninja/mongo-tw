const { createCollection } = require("../utils/collectionTools");
const twitterApi = require("../../api/resources/twitter/main");
const schema = require("../../api/models/Twitt");
const COLLECTION_NAME = "Twitts";
let COLLECTION = null;
const phpKeyword = "Php";
const jsKeyword = "Javascript";
const TWEET_SEARCH_COUNT = 1000;

const upsert = async (twitts, keyword) => {
    // console.log(twitts.search_metadata);
    if (twitts.statuses && Array.isArray(twitts.statuses)) {
        twitts.statuses.forEach(twitt => {
            const data = {
                ...twitt,
                $addToSet: {
                    big_data_keywords: [keyword]
                }
            };
            COLLECTION.update({ id_str: data.id_str }, data, { upsert: true },
                function (err) {
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
        upsert(await client.get("search/tweets", { q: jsKeyword, count: TWEET_SEARCH_COUNT }), jsKeyword);
        upsert(await client.get("search/tweets", { q: phpKeyword, count: TWEET_SEARCH_COUNT }), phpKeyword);
        console.warn(`Populated ${COLLECTION_NAME} Collection`);
        return;
    } catch (e) {
        console.warn(`Could not seed ${COLLECTION} collection`, e);
        return;
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
    },
    async getJsTweetNumber() {
        if (!COLLECTION) {
            return null;
        }
        try {
            return COLLECTION.count({
                big_data_keywords: { $in: [jsKeyword] }
            });
        } catch (e) {
            console.warn("Couldn't count current js tweets", e);
            return null;
        }
    },
    async getPhpTweetNumber() {
        if (!COLLECTION) {
            return null;
        }
        try {
            return COLLECTION.count({
                big_data_keywords: { $in: [phpKeyword] }
            });
        } catch (e) {
            console.warn("Couldn't count current php tweets", e);
            return null;
        }
    },

};
