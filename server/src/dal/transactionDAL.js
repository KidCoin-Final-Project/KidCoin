const db = require('../utils/firebase-admin')

module.exports = {

    getChildTransactions: function (childId) {
        return db.database.collection('transaction')
            .where('child_id', '==', db.database.collection('child').doc(childId))
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },

    getStoreTransactions: function (storeId) {
        return db.database.collection('transaction')
            .where('store_id', '==', db.database.collection('store').doc(storeId))
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}