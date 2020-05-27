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
    getByID: function (userId) {
        return db.collection('user')
            .doc(userId)
            .get()
            .then(doc => {
                if(doc.exists){
                    return doc.data()
                }
                return undefined;
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
}
