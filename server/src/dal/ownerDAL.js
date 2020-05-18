const db = require('../utils/firebase-admin').database

module.exports = {
    addOwner: function (userId) {
        return db.collection('owner').doc(userId).set({
            store: ''
        });
    },
    getByID: function (userId) {
        return db.collection('owner')
            .doc(userId)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
}