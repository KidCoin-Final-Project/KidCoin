const db = require('../utils/firebase-admin')

module.exports = {
    getAll: function(){
        db.database.collection('users').get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    },
    getByID: function(ID){
        return db.database.collection('users').doc(ID).get().then(doc =>{
            return doc;
        })
        .catch(err => {
            throw new Error('something bad happened: '+ err);
        })
    }
}