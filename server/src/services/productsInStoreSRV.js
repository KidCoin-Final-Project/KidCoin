const productsInStoreDal = require('../dal/productsInStoreDAL')

module.exports = {

    getByPrice: function (storeID, productId) {  
        return productsInStoreDal.getPrice(storeID, productId).then(doc => {
            if (doc.empty) {
                console.log('couldnt find product.');
                return;
            }
            return doc;
        });
    },

    getByStoreId: function (storeID) {  
        return productsInStoreDal.getStoreProducts(storeID).then(doc => {
            if (doc.empty) {
                console.log('couldnt find product.');
                return;
            }
            return doc;
        });
    },
/*     getAll: function(){
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
        return productDAL.getByCategory(category);
    } */
}

