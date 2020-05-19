const db = require('../utils/firebase-admin').database

module.exports = {

    getByID: function (userId) {
        return db.collection('child')
            .doc(userId)
            .get()
            .then(doc =>{
                return doc.data();
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    addChild: function (userId) {
        return db.collection('child').doc(userId).create({
            balance: 0
        });
    }
}