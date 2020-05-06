const db = require('../utils/firebase-admin').database

module.exports = {

    requestMoneyFromParent: function (childId, amount) {
        return db.collection('moneyTransfer').add({
            child: db.collection('child').doc(childId),
            amount: amount,
            accepted: false
        })
    }

}