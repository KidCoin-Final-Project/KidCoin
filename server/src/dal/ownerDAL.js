const db = require('../utils/firebase-admin').database

module.exports = {
    addOwner: function (type, userId) {
        return db.collection(type).doc(userId).set({
            store: ''
        });
    }
}