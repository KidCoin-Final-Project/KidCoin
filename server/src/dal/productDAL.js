const db = require('../misc/firebase-admin')

module.exports = {
    getAll: function(){
        db.database.collection('product').get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    },
    getByID: function(ID){
        return db.database.collection('product').doc(ID).get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    }
}