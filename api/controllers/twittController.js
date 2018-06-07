const Twitt = require("../../db/schema/twitt");

/** list twitts **/
exports.list_all = async function (req, res) {
    try {
        const query = Twitt.getCollection().find({}).select("big_data_keywords");
        const twitts = await query.exec();
        return res.json(twitts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.get_stats = async function(req, res) {
    try {
        const data = {
            js: {
                tweetsNumber: await Twitt.getJsTweetNumber(),
                avgAuthorTweetsNumber: Math.floor(Math.random() * 1000),
                avgResponseToTweet: Math.floor(Math.random() * 1000),
                avgRetweet: Math.floor(Math.random() * 1000),
                avgAuthorFollowers: Math.floor(Math.random() * 1000),
                avgFamousAuthors: Math.floor(Math.random() * 1000),
                tweetsPerLanguage: [
                    {
                        language: Math.floor(Math.random() * 1000),
                    }
                ],
                avgAuthorFriends: Math.floor(Math.random() * 1000),
                avgAuthorFavorites: Math.floor(Math.random() * 1000),
            },
            php: {
                tweetsNumber: await Twitt.getPhpTweetNumber(),
                avgAuthorTweetsNumber: Math.floor(Math.random() * 1000),
                avgResponseToTweet: Math.floor(Math.random() * 1000),
                avgRetweet: Math.floor(Math.random() * 1000),
                avgAuthorFollowers: Math.floor(Math.random() * 1000),
                avgFamousAuthors: Math.floor(Math.random() * 1000),
                tweetsPerLanguage: [
                    {
                        language: Math.floor(Math.random() * 1000),
                    }
                ],
                avgAuthorFriends: Math.floor(Math.random() * 1000),
                avgAuthorFavorites: Math.floor(Math.random() * 1000),
            },
        };

        return res.json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};
