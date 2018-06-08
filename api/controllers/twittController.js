const Twitt = require("../../db/schema/twitt");

/** list twitts **/
exports.list_all = async function (req, res) {
    try {
        const query = Twitt.getCollection().find({}).limit(-10);
        const twitts = await query.exec();
        return res.json(twitts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.get_stats = async function(req, res) {
    try {
        const data = {
            tweetsNumber: await Twitt.getTweetNumber(Twitt.jsKeyword),
            avgAuthorTweetsNumber: await Twitt.getAvgAuthorTweetNumber(),
            // @TODO Replace by group_by entities mentionned (hashtags: react, angular vue etc..),
            // avgResponseToTweet: Math.floor(Math.random() * 1000),
            avgRetweet: await Twitt.getRetweetAvg(),
            avgAuthorFollowers: await Twitt.getAvgAuthorFollowers(),
            avgFamousAuthors: Math.floor(Math.random() * 1000),
            tweetsPerLanguage: await Twitt.getTweetsPerLanguage(),
            avgAuthorFriends: await Twitt.getAvgAuthorFriends(),
            avgAuthorFavorites: await Twitt.getAvgAuthorFavorites(),
        };

        return res.json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};
