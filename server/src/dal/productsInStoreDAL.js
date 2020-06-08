const db = require('../misc/firebase-admin').database

module.exports = {

    getPrice: function (storeID, productId) {
        return db.collection('productsInStore').where('product_id', '==', db.collection('product').doc(productId))
        .where('store_id', '==', db.collection('store').doc(storeID)).get().then(docs =>{

            let productsData = []
            docs.docs.forEach(product => {
                productsData.push({
                    'price': product.data().price
                })
            });
            return productsData;
        })

    },

    getStoreProducts: function(storeID){
        return db.collection('productsInStore').where('store_id', '==', db.collection('store').doc(storeID)).get().then(docs =>{

            let productsData = []
        docs.docs.forEach(product => {
/*              db.collection('product').doc(product.data().product_id).get().then(doc2 =>{
                    productsData.push({
                        'category': doc2.data().category,
                        'name': doc2.data().name,
                        'ingredients': doc2.data().ingredients,
                        'picture': doc2.data().picture,

    
                    });
                })  */
                productsData.push({
                    'price': product.data().price,
                    'store_id': product.data().store_id,
                    'product_id': product.data().product_id

                })
            });
            return productsData;
        })
    },
    /*
    getByID: function(ID){
        return db.collection('product').doc(ID).get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    },

    getByCategory: function(category){
        return db.collection('product').where("category", "==", category).get().then(doc =>{
            return doc.docs;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    } */
}