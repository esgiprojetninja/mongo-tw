const Twitt = require("../../db/schema/twitt");

/** list twitts **/
exports.list_all = async function (req, res) {
    try {
        const tweets = await Twitt.getAvgVerifiedAuthorsPerKeyword("Javascript"); 
        return res.json(tweets);
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
            // avgFamousAuthors: await Twitt.getAvgVerifiedAuthors(),
            tweetsPerLanguage: await Twitt.getTweetsPerLanguage(),
            avgAuthorFriends: await Twitt.getAvgAuthorFriends(),
            avgAuthorFavorites: await Twitt.getAvgAuthorFavorites(),
        };

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
        await Promise.all(Object.keys(keywordsAsKeys).map(async keyword => {
            return new Promise(async (resolve) => {
                const { verified, unverified } = await Twitt.getAvgVerifiedAuthorsPerKeyword(keyword);
                keywordsAsKeys[keyword].avgFamousAuthors = {
                    percentage: unverified > 0 ? (verified * 100) / unverified: 0,
                    verified,
                    unverified,
                };
                resolve();
            });
        }));
        return res.json(keywordsAsKeys);
    } catch (error) {
        return res.status(500).send(error);
    }
};
