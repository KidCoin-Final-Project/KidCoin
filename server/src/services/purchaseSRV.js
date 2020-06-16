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
        let storeId = await ownerDAL.getByID(userID).then(owner => {
            return owner.store.id;
        })
        let msBack = req.query.msBack;
        if (!msBack) {
            msBack = 1000 * 60 * 60 * 24 * 365;
        }
        return purchaseDAL.getStorePurchases(storeId, msBack).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store purchase.');
                return;
            }
            console.log(res);
            return res.docs;
        });
    },

    totalRevenue: async function (req) {

        let userID = await utils.getIdByToken(req.headers.authtoken);
        let storeId = await ownerDAL.getByID(userID).then(owner => {
            return owner.store.id;
        })
        let msBack = req.query.msBack;
        if (!msBack) {
            msBack = 1000 * 60 * 60 * 24 * 365;
        }

        return purchaseDAL.getStorePurchases(storeId, msBack).then(res => {
            if (res.empty) {
                console.log('Couldnt find any store purchase.');
                return;
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