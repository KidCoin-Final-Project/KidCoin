const db = require('../misc/firebase-admin').database

module.exports = {

    getProduct: function(id){
        return db.collection('productsInStore').doc(id).get().then(doc=>{
            if(!doc.empty){
                return doc.data().product_id.get().then(doc=>{
                    if(!doc.empty){
                        return {...doc.data(), id: doc.id};
                    }
                    return undefined;
                })
            }
            return undefined;
        })
    },
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
            price: Number(price),
            product_id: db.collection('product').doc(productID),
            store_id: db.collection('store').doc(storeID),
           
        })
    }

    
 
}