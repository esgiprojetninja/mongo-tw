const { createCollection } = require("../utils/collectionTools");
const twitterApi = require("../../api/resources/twitter/main");
const schema = require("../../api/models/Twitt");
const COLLECTION_NAME = "Twitts";
let COLLECTION = null;
const phpKeyword = "Php";
const jsKeyword = "Javascript";
const noKeywordSet = "unreferenced";
const TWEET_SEARCH_COUNT = 1000;

const searchDefaultParams = {
    count: TWEET_SEARCH_COUNT,
    result_type: "popular",
};

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
        upsert(await client.get("search/tweets", {
            ...searchDefaultParams,
            q: jsKeyword,
        }), jsKeyword);
        upsert(await client.get("search/tweets", {
            ...searchDefaultParams,
            q: phpKeyword,
        }), phpKeyword);
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
    phpKeyword,
    jsKeyword,
    getCollectionName() {
        return COLLECTION_NAME;
    },
    getCollection() {
        return COLLECTION;
    },
    async getTweetNumber() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            total: { $sum: 1 }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.total
            }));
        } catch (e) {
            console.warn("Couldn't count current tweets", e);
            return null;
        }
    },
    async getAvgAuthorTweetNumber() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            avgQuantity: { $avg: "$user.statuses_count" }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.avgQuantity
            }));
        } catch (e) {
            console.warn("Couldn't calculate current avg author tweets number", e);
            return null;
        }
    },
    async getRetweetAvg() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            avgQuantity: { $avg: "$retweet_count" }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.avgQuantity
            }));
        } catch (e) {
            console.warn("Couldn't calculate current avg author tweets number", e);
            return null;
        }
    },
    async getAvgAuthorFollowers() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            avgQuantity: { $avg: "$user.followers_count" }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.avgQuantity
            }));
        } catch (e) {
            console.warn("Couldn't calculate current avg author tweets number", e);
            return null;
        }
    },
    async getAvgAuthorFriends() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            avgQuantity: { $avg: "$user.friends_count" }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.avgQuantity
            }));
        } catch (e) {
            console.warn("Couldn't calculate current avg author tweets number", e);
            return null;
        }
    },
    async getAvgAuthorFavorites() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: "$big_data_keywords",
                            avgQuantity: { $avg: "$user.favourites_count" }
                        }
                    },
                ]);
            return rows.map(group => ({
                keyword: Array.isArray(group._id) ? group._id.join(", ") : noKeywordSet,
                val: group.avgQuantity
            }));
        } catch (e) {
            console.warn("Couldn't calculate current avg author tweets number", e);
            return null;
        }
    },
    async getTweetsPerLanguage() {
        if (!COLLECTION) {
            return null;
        }
        try {
            const rows = await COLLECTION
                .aggregate([
                    {
                        $group: {
                            _id: {
                                lang: "$lang",
                                big_data_keywords: "$big_data_keywords",
                            },
                            total: { $sum: 1 }
                        }
                    },
                ]);
            return rows.map(group => ({
                language: group._id,
                val: group.total
            }));
        } catch (e) {
            console.warn("Couldn't count current tweets", e);
            return null;
        }
    }
};
