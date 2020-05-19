const db = require('../misc/firebase-admin').database

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
        return db.collection('user').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
            }
        })
    }
}
