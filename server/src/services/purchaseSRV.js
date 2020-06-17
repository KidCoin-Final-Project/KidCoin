const purchaseDAL = require('../dal/purchaseDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils')

const getDataFromRes = function (res) {
    if (res.empty) {
        console.log('Couldnt find any purchase.');
        return;
    }
    var purchases = []
    for(let i=0;i<res.size;i++){
        purchase = res.docs[i].data();
        purchases.push({
            'childId': purchase.child.id,
            'productFromStore': purchase.productFromStore.id,
            'store': purchase.store.id,
            'price': purchase.price,
            'date': purchase.date.toDate()
        })
    }
    return purchases;
};


module.exports = {

    getChildPurchases: function (childId) {
        return purchaseDAL.getChildPurchases(childId).then(getDataFromRes);
    },
    getStorePurchases: async function (req) {
        let userID = await utils.getIdByToken(req.headers.authtoken);
        let store = await ownerDAL.getByID(userID).then(owner =>{
            return owner.store;
        })
        return purchaseDAL.getStorePurchases(store).then(getDataFromRes);
    },
    createNewPurchase: function (req) {
        const {
            productFromStoreId
        } = req.body;
        //need productFromStoreDAL
        return purchaseDAL.newPurchase().then(getDataFromRes);
    }
}