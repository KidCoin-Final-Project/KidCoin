const productDAL = require('../dal/productDAL')

module.exports = {
    getAll: function(){
        return productDAL.getAll().then(doc => {
            if (doc.empty) {
                console.log('couldnt find products.');
                return;
            }
            return doc.docs;
        });
    },

    getByID: function(ID){
        return productDAL.getByID(ID).then(doc => {
            if (doc.empty) {
                console.log('couldnt find product.');
                return;
            }
            return doc;
        });
    },

    getByCategory: function(category){
        return productDAL.getByCategory(category).then(doc => {
            if(doc.empty) {
                console.log('couldnt find category. ');
                return
            }
            return doc;
        });
    },
   
}

