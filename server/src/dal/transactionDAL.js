const db = require('../utils/dbConnection')

module.exports = {

    getChildTransactions: function (childId) {
        return db.database.collection('money_transfer_requests')
            .where('child', '==', childId)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}