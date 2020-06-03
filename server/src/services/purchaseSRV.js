const purchaseDAL = require('../dal/purchaseDAL')

module.exports = {

    getChildPurchases: function (childId) {
        return purchaseDAL.getChildPurchases(childId).then(res => {
            if (res.empty) {
                console.log('Couldnt find any child purchase.');
                return;
            }
            return res.docs;
        });
    },
    getStorePurchases: function (req) {
        
        return purchaseDAL.getStorePurchases(storeId).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store purchase.');
                return;
            }
            return res.docs;
        });
    },
    getStorePurchases: function (req) {
        
        return purchaseDAL.getStorePurchases(storeId).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store purchase.');
                return;
            }
            return res.docs;
        });
    }
}