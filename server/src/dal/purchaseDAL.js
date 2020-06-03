const db = require('../misc/firebase-admin')
const daysToMsMultiplier = 1000*60*60*24;

module.exports = {

    getChildPurchases: function (childId, msBack) {
        var now = new Date().getTime();
        return db.database.collection('purchase')
            .where('child', '==', db.database.collection('child').doc(childId))
            .orderBy('date')
            .startAt(now - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },

    getStorePurchases: function (storeId, msBack) {
        return db.database.collection('purchase')
            .where('store', '==', db.database.collection('store').doc(storeId))
            .orderBy('date')
            .startAt(now - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}