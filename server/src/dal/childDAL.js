const db = require('../utils/firebase-admin').database

module.exports = {

    getByID: function (userId) {
        return db.collection('child')
            .doc(userId)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    addChild: function (type, userId) {
        return db.collection(type).doc(userId).set({
            balance: 0
        });
    }
}