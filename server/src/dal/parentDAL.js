const db = require('../utils/firebase-admin').database

module.exports = {
    addParent: function (userId) {
        return db.collection('parent').doc(userId).set({
            childrens: []
        });
    }
}