const db = require('../utils/firebase-admin').database

module.exports = {

    addUser: function (uid, firstName, lastName, phoneNumber, type) {
        return db.collection('user').doc(uid).create({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            type: type
        });
    },
    getByUid : function (uid) {
        return db.collection('users').doc(uid).get();
    }
}
