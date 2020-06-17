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
            var category;
         
        docs.docs.forEach(product => {

                productsData.push({
                    'price': product.data().price,
                    'store_id': product.data().store_id,
                    'product_id': product.data().product_id

                })
            });
            return productsData;
        })
    },

    addProducttoStore: function(storeID, productID, price)
    {
        return db.collection('productsInStore').add({
            price: price,
            product_id: db.collection('product').doc(productID),
            store_id: db.collection('store').doc(storeID),
           
        })
    }

    
 
}