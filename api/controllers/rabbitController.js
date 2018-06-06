const Rabbit = require("../models/Rabbit");
const attributesSelect = "name gender city diet weight height";

/** list rabbits **/
exports.list_all_rabbits = async function(req, res) {
    try {
        const query = Rabbit.find({}).select(attributesSelect).sort();
        const rabbits = await query.exec();
        return res.json(rabbits);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** display rabbit **/
exports.read_rabbit = async function(req, res) {
    try {
        const query = Rabbit.find({ id: req.params.Id }).select(attributesSelect);
        const rabbits = await query.exec();
        return res.json(rabbits);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** create rabbit **/
exports.create_rabbit = async function(req, res) {
    try {
        const new_rabbit = new Rabbit(req.body);
        const saved_rabbit = await new_rabbit.save();
        return res.json(saved_rabbit);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** update rabbit **/
exports.update_rabbit = async function(req, res) {
    try {
        const query = Rabbit.findOneAndUpdate({ id: req.params.Id }, req.body, { new: true });
        const rabbits = await query.exec();
        return res.json(rabbits);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** delete rabbit **/
exports.delete_rabbit = async function(req, res) {
    try {
        const query = Rabbit.remove({ id: req.params.Id });
        await query.exec();
        return res.json(true);
    } catch (error) {
        return res.status(500).send(error);
    }
};
