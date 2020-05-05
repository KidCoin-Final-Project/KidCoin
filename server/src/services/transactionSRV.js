const transactionDAL = require('../dal/transactionDAL')

module.exports = {

    getChildTransactions: function (childId) {
        return transactionDAL.getChildTransactions(childId).then(res => {
            if (res.empty) {
                console.log('couldnt find child transaction.');
                return;
            }
            return res.docs[0].data();
        });
    }
}