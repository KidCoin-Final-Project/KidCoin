const purchaseDAL = require('../dal/purchaseDAL')
const productsInStoreDal = require('../dal/productsInStoreDAL')
const childDAL = require('../dal/childDAL')
const storeDAL = require('../dal/storeDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils')
const conf = require('../../config/conf.json')
const request = require('request-promise')
const { response } = require('express')

const getDataFromRes = async function (res) {
    if (res.empty) {
        console.log('Couldnt find any purchase.');
        return {};
    }
    var purchases = []
    for(let i=0;i<res.size;i++){
        purchase = res.docs[i].data();
        product = await productsInStoreDal.getProduct(purchase.productInStore.id);
        store = await storeDAL.getById(purchase.store.id);
        delete store.owner;
        delete store.bankAccount;
        purchases.push({
            'childId': purchase.child.id,
            'productFromStore': purchase.productInStore.id,
            'store': purchase.store.id,
            'storeData': store,
            'productData': product,
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
    createNewPurchase: async function (req, res) {
        const {
            productFromStoreId
        } = req.body;
        if(!productFromStoreId){
            return res.status(400).send('productFromStoreId is required');
        }
        let userID = await utils.getIdByToken(req.headers.authtoken);
        let child = await childDAL.getByID(userID);
        let {
            price, storeBankAccount
        } = await purchaseDAL.getPriceAndStoreBankAccount(productFromStoreId);
        if(child.balance < price){
            return res.status(406).send('not enough blanace for child');
        }
        //transfer money to store owner:
        var transRes = await transferMoneyToStore(price, storeBankAccount);
        if(!transRes){
            return res.status(500).send('bank transaction not successful');
        }
        childDAL.addBalance(userID, (price * -1));
        return purchaseDAL.newPurchase(productFromStoreId, userID).then(async doc=>{
            var data = doc.data();
            return {
                'childId': data.child.id,
                'productFromStore': data.productInStore.id,
                'store': data.store.id,
                'price': Number(data.price),
                'date': data.date.toDate()
            }
        }).catch(e=>{
            if(e == 404){
                return res.status(404).send('product in store not found');
            } else{
                return res.status(500).send('internal server error');
            }
        });
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

async function transferMoneyToStore(amount, bankAccount){
    var success = false;
    var res = await request.post({
        headers: {'content-type' : 'application/json'},
        url:     conf.bankUrl + 'transfer',
        body:    JSON.stringify({
            amount: amount,
            fromAccount: conf.bankAccount,
            toAccount: bankAccount
        })
      }).on('error', res =>{
         success = false
      })
      .on('response', res =>{
          if(res.statusCode == 200){
            success = true
          }
      }).catch(e=>{success = false});
      return success;
}