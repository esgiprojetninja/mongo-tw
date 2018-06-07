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

exports.get_stats = async function(req, res) {
    try {
        const collection = Twitt.getCollection();
        // @TODO nb twitts satts
        const data = {
            js: {
                tweetsNumber: await collection.find({ id_str: "1004705280553377792" })
            },
            php: {
                
            },
        };

        return res.json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};
