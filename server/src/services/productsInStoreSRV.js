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

    addProduct: function(storeID, productID, price){
        return productsInStoreDal.addProducttoStore(storeID, productID, price).then(doc => {
            if(doc.empty) {
                console.log('couldnt add product. ');
                return
            }
            console.log('new product was added successfully');
            return {doc};
        });
    },

}

