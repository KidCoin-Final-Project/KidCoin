const db = require('../utils/firebase-admin').database

module.exports = {

    requestMoneyFromParent: function (firstName, lastName, phoneNumber, type) {
        return db.collection('user').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            type: type
        });
    }
}
