const mongoose = require("mongoose");

module.exports.emptyCollection = async (collectionName) => 
    new Promise((resolve, reject) => {
        const name = `${collectionName.toLowerCase()}`;
        mongoose.connection.db.listCollections({ name })
            .next((err, collinfo) => {
                if (err) {
                    console.error(`Failed to delete ${collectionName} model`, err);
                    reject(err);
                }
                if (collinfo) {
                    mongoose.connection.db.dropCollection(name, (err) => {
                        if (err) {
                            console.error(`Failed to delete ${collectionName} model`, err);
                            reject(err);
                        }
                        console.warn(`Removed ${collectionName} Collection`);
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
    });

module.exports.createCollection = (collectionName, schema) => {
    const collection = mongoose.model(collectionName, schema);
    console.warn(`Created ${collectionName} Collection`);
    return collection;
};
