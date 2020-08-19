const db = require('../misc/firebase-admin').database

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
    addChild: function (userId, age, sex) {
        return db.collection('child').doc(userId).create({
            balance: 0,
            age: Number(age),
            sex: sex
        });
    },
    addBalance: function (childId, balanceToAdd){
        return db.collection('child').doc(childId).get().then(doc => {
            return db.collection('child').doc(childId).update({balance:doc.data().balance + balanceToAdd})
        })
    }
}