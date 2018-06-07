const Twitt = require("../../db/schema/twitt");

/** list twitts **/
exports.list_all = async function (req, res) {
    try {
        const query = Twitt.getCollection().find({});
        const twitts = await query.exec();
        return res.json(twitts);
    } catch (error) {
        return res.status(500).send(error);
    }
};
