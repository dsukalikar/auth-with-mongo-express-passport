const monk = require('monk');

var dbConn = (dbName) => {
    const db = monk('localhost/' + dbName);
    db.then(data => console.log('Connected to DB')).catch(err => console.log(err));
    const operations = (collection) => {
        const fetch = () => db.get(collection).find({});
        const fetchById = (id) => db.get(collection).findOne({ '_id': id });
        const insert = (object) => db.get(collection).insert(object);
        const update = (object, id) => db.get(collection).update({ '_id': id }, { $set: object });
        const deleteById = (id) => db.get(collection).remove({ '_id': id });
        return { fetch, fetchById, insert, update, deleteById };
    }
    return { db, operations };
}

module.exports = dbConn;