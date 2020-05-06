const transactionDAL = require('../dal/transactionDAL')

module.exports = {

    getChildTransactions: function (childId) {
        return transactionDAL.getChildTransactions(childId).then(res => {
            if (res.empty) {
                console.log('Couldnt find any child transaction.');
                return;
            }
            return res.docs;
        });
    },
    getStoreTransactions: function (storeId) {
        return transactionDAL.getStoreTransactions(storeId).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store transaction.');
                return;
            }
            return res.docs;
        });
    }
}