const db = require('../misc/firebase-admin').database
const auth = require('../misc/firebase-admin').auth

module.exports = {

    addUser: function (uid, firstName, lastName, phoneNumber, type) {
        return db.collection('user').doc(uid).create({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            type: type
        })
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
    getByUid: function (uid) {
        return db.collection('user').doc(uid).get().then(function (doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("No such document!");
            }
        })
    },
    getByEmail: function (email) {
        return auth.getUserByEmail(email).then(doc => {
            return db.collection('user').doc(doc.uid).get().then(function (doc) {
                if (doc.exists) {
                    data = doc.data();
                    data.id = doc.id;
                    return data;
                } else {
                    console.log("No such document!");
                }
            })
        }).catch(err => {
            throw new Error('something bad happened: ' + err);
        })
    },

}
