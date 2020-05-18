const db = require('../misc/firebase-admin').database

module.exports = {
    addParent: function (userId) {
        return db.collection('parent').doc(userId).set({
            childrens: []
        });
    }
}