const db = require('../misc/firebase-admin').database

module.exports = {


    addChildToParent: function(parentID, child){
        return db.collection('parent').doc(parentID).get()
        .then(doc => {
            var childrensArr = doc.data().childrens;
            childrensArr.push(child);
            return db.collection('parent').doc(parentID).update({childrens: childrensArr})
        });
    },

    addParent: function (userId) {
        return db.collection('parent').doc(userId).set({
            childrens: []
        });
    },
    getByID: function (userId) {
        return db.collection('parent')
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
    }
}