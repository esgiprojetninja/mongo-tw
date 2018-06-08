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
            avgFamousAuthors: await Twitt.getAvgVerifiedAuthors(),
            tweetsPerLanguage: await Twitt.getTweetsPerLanguage(),
            avgAuthorFriends: await Twitt.getAvgAuthorFriends(),
            avgAuthorFavorites: await Twitt.getAvgAuthorFavorites(),
        };

        /*
        tweetsNumber: 2438,
        avgAuthorTweetsNumber: 42054.39376538146,
        avgRetweet: 273.2182116488925,
        avgAuthorFollowers: 25957.769483182936,
        avgFamousAuthors: 0,
        avgAuthorFriends: 1343.0410172272354,
        avgAuthorFavorites: 7126.344544708778
        */

        const keywordsAsKeys = data.tweetsNumber.reduce((obj, currentTweetStat) => ({ ...obj, [currentTweetStat.keyword]: {} }), {});
        Object.keys(data).forEach(statDataKey => {
            const statArr = data[statDataKey];
            statArr.forEach(statArrItem => {
                if (statArrItem.hasOwnProperty("keyword") && keywordsAsKeys[statArrItem.keyword]) {
                    keywordsAsKeys[statArrItem.keyword][statDataKey] = statArrItem.val;
                }
            });
        });
        data.tweetsPerLanguage.forEach(languageItem => {
            if (Array.isArray(languageItem.language.keyword)) {
                const lang = languageItem.language.lang;
                const keyword = languageItem.language.keyword.join(", ");
                keywordsAsKeys[keyword].tweetsPerLanguage = {
                    ...keywordsAsKeys[keyword].tweetsPerLanguage,
                    [lang]: languageItem.val
                };
            }
        });
        return res.json(keywordsAsKeys);
    } catch (error) {
        return res.status(500).send(error);
    }
};
