const db = require('../utils/firebase-admin').database

module.exports = {
    addParent: function (type, userId) {
        return db.collection(type).doc(userId).set({
            childrens: []
        });
    }
}