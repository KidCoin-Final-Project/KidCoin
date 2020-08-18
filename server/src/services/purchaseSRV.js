const purchaseDAL = require('../dal/purchaseDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils')

const getDataFromRes = function (res) {
    if (res.empty) {
        console.log('Couldnt find any purchase.');
        return {};
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
            if(owner && owner.store){
                return owner.store.id;
            } return "-1";
        })
        return purchaseDAL.getStorePurchases(store).then(getDataFromRes);
    },
    createNewPurchase: function (req) {
        const {
            productFromStoreId
        } = req.body;
        //need productFromStoreDAL
        return purchaseDAL.newPurchase().then(getDataFromRes);
    },

    totalRevenue: async function (req) {

        let userID =await utils.getIdByToken(req.headers.authtoken);
        let storeId = await ownerDAL.getByID(userID).then(owner => {
            if(owner && owner.store){
                return owner.store.id;
            } return "-1";
        })
        let msBack = req.query.msBack;
        if (!msBack) {
            msBack = 1000 * 60 * 60 * 24 * 365;
        }

        return purchaseDAL.getStorePurchases(storeId, msBack).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store purchase.');
                return {
                    'totalRevenue': 0,
                    'numOfPurchases': 0
                };
            }
            let totalRevenue = 0;
            res.docs.forEach(purchase => {
                totalRevenue = totalRevenue + purchase.data().price;
            });
            return {
                'totalRevenue': totalRevenue,
                'numOfPurchases': res.size
            };
        });
    }
}