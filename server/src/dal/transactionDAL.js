const db = require('../misc/firebase-admin')
const daysToMsMultiplier = 1000*60*60*24;

module.exports = {

    getChildTransactions: function (childId, msBack) {
        var now = new Date().getTime();
        return db.database.collection('transaction')
            .where('child', '==', db.database.collection('child').doc(childId))
            .orderBy('date')
            .startAt(now - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },

    getStoreTransactions: function (storeId, msBack) {
        return db.database.collection('transaction')
            .where('store', '==', db.database.collection('store').doc(storeId))
            .orderBy('date')
            .startAt(now - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}