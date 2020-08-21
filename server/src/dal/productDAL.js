const db = require('../misc/firebase-admin').database

module.exports = {
    getAll: function(){
        return db.collection('product').get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    },
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
    },

    addProduct: function (name, category, ingredients, description, money, picture, productID) {
        return db.collection('product').add({
            name: name,
            category: category,
            ingredients: ingredients,
            description: description,
            money: money,
            picture: picture,
            productID
        });
    },
    getProductInStore: function (productId, storeId) {
        return db.collection('productsInStore').where('product_id', '==', db.collection('product').doc(productId))
        .where('store_id', '==', db.collection('store').doc(storeId)).get().then(docs =>{
            if(!docs.empty){
                return {...docs.docs[0].data(), id: docs.docs[0].id}
            }
            return undefined;
        });
    }
}