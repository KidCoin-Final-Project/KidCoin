const db = require('../misc/firebase-admin').database

module.exports = {
    addOwner: function (userId, store) {
        return db.collection('owner').doc(userId).set({
            store: store
        });
    },
    getByID: function (userId) {
        return db.collection('owner')
            .doc(userId)
            .get()
            .then(doc =>{
                return doc.data();
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}