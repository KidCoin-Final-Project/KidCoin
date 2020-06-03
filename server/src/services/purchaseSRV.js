const purchaseDAL = require('../dal/purchaseDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils')

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
    getStorePurchases: async function (req) {
        let userID = await utils.getIdByToken();
        let storeId = await ownerDAL.getByID(userID).then(owner =>{
            return owner.store.id;
        })
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