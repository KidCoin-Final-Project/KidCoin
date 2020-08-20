const db = require('../misc/firebase-admin')
const admin = require('firebase-admin');
const daysToMsMultiplier = 1000*60*60*24;

module.exports = {

    getChildPurchases: async function (childId, msBack) {
        var now = new Date().getTime();
        let answer = await db.database.collection('purchase')
            .where('child', '==', db.database.collection('child').doc(childId))
            .orderBy('date')
            .startAt(now - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
        return answer;
    },

    getStorePurchases: function (storeId, msBack) {
        let now = new Date()
        return db.database.collection('purchase')
            .where('store', '==', db.database.collection('store').doc(storeId))
            .orderBy('date')
            .startAt(new Date() - msBack)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    newPurchase: function(productInStoreId, childId){
        var productInStoreDoc = db.database.collection('productsInStore').doc(productInStoreId);
        return productInStoreDoc.get().then(doc => {
            if(doc.exists){
                productInStore = doc.data();
                return db.database.collection('purchase').add({
                    price: Number(productInStore.price),
                    store: productInStore.store_id,
                    date: admin.firestore.Timestamp.fromDate(new Date()),
                    child: db.database.collection('child').doc(childId),
                    productInStore: productInStoreDoc
                }).then(doc=>{
                    return doc.get();
                });
            } else{
                throw 404;
            }
        })
    },
    getPriceAndStoreBankAccount: function(productInStoreId){
        var productInStoreDoc = db.database.collection('productsInStore').doc(productInStoreId);
        return productInStoreDoc.get().then(async doc => {
            if(doc.exists){
                var storeBankAccount = await doc.data().store_id.get().then(doc=>{
                    return doc.data().bankAccount;
                })
                return {price:Number(doc.data().price), storeBankAccount:storeBankAccount};
            } else{
                throw 404;
            }
        })
    }
}