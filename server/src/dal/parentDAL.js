const db = require('../utils/firebase-admin').database

module.exports = {

    getByID: function (userId) {
        return db.collection('parent')
            .doc(userId)
            .get()
            .then(doc =>{
                return doc.data();
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },


    addParent: function (userId) {
        return db.collection('parent').doc(userId).set({
            childrens: []
        });
    }
}