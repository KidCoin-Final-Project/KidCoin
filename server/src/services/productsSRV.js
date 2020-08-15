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
            var products = []
            for(let i=0;i<doc.length;i++){
                products.push({
                    'category:': doc[i]._fieldsProto.category.stringValue,
                    'ingredients': doc[i]._fieldsProto.ingredients.stringValue,
                    'name': doc[i]._fieldsProto.name.stringValue,
                   'picture': doc[i]._fieldsProto.picture.stringValue,
                })
            }
            return products;
        });
    },
   
}

