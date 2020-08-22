const db = require('../misc/firebase-admin').database

module.exports = {

    getByID: function (userId) {
        return db.collection('child')
            .doc(userId)
            .get()
            .then(doc =>{
                var data = doc.data();
                var restrictions = [];
                for (let i = 0; i < data.restrictions.length; i++) {
                    restrictions.push(data.restrictions[i].id)
                    
                }
                data.restrictions = restrictions;
                return data;

            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    addChild: function (userId) {
        return db.collection('child').doc(userId).create({
            balance: 0,
            restrictions: []
        });
    },
    addBalance: function (childId, balanceToAdd){
        return db.collection('child').doc(childId).get().then(doc => {
            return db.collection('child').doc(childId).update({balance:doc.data().balance + balanceToAdd})
        })
    },
    addRestriction: function (childId, productId){
        return db.collection('child').doc(childId).get().then(doc => {
            if(!doc.exists){
                throw 404;
            }
            var restrictions = doc.data().restrictions;
            if(!restrictions){
                restrictions = [];
            }
            restrictions.push(db.collection('product').doc(productId))
            return db.collection('child').doc(childId).update({restrictions:restrictions})
        })
    }
}