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

    addProduct: function (name, category, ingredients, picture) {
        return db.collection('product').add({
            name: name,
            category: category,
            ingredients: ingredients,
            picture: picture
        });
    },
}