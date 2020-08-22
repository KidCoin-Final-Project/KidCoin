const productDAL = require('../dal/productDAL')
const productsInStoreDAL = require('../dal/productsInStoreDAL')
const purchaseDAL = require('../dal/purchaseDAL')
const ownerDAL = require('../dal/ownerDAL')
const childDAL = require('../dal/childDAL')
const productReviewSRV = require('./productReviewSRV')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const utils = require('../misc/utils')
const fs = require('fs');
const middleware = require('../misc/middleware');
const csvDir = './server/csvs';



module.exports = {
    getAll: function(){
        return productDAL.getAll().then(async doc => {
            if (doc.empty) {
                console.log('couldnt find products.');
                return;
            }

            var docs = doc.docs;
            var products = []
            for(let i=0;i<docs.length;i++){
                products.push({
                    ...docs[i].data(),
                    id: docs[i].id,
                   avgRating: await productReviewSRV.getAvgRatingByProductId(docs[i].id)
                })
            }
            return products;
        });
    },

    getByID: function(ID){
        return productDAL.getByID(ID).then(async doc => {
            if (doc.empty) {
                console.log('couldnt find product.');
                return;
            }

            return {
                ...doc.data(),
                'avgRating': await productReviewSRV.getAvgRatingByProductId(ID)
            };
        });
    },

    getByCategory: async function(req){
        var userType = await utils.getUserType(req.headers.authtoken)
        var child;
        if(userType == 'child'){
            child = await childDAL.getByID(await utils.getIdByToken(req.headers.authtoken));
        }
        return productDAL.getByCategory(req.params.category).then(async doc => {
            if(doc.empty) {
                console.log('couldnt find category.');
                return
            }
            var products = []
            for(let i=0;i<doc.length;i++){
                if(!child || (child && child.restrictions.indexOf(doc[i].id) == -1)){
                    products.push({
                        ...doc[i].data(),
                        id: doc[i].id,
                    'avgRating': await productReviewSRV.getAvgRatingByProductId(doc[i].id)
                    })
                }
            }
            return products;
        });
    },


    addProduct: async function (req, res) {
        const {
            name, category, ingredients, description, price, prodId
        } = req.body;
        var picture = req.body.picture.split('\\')[req.body.picture.split('\\').length-1];
        try {
            const userID = await utils.getIdByToken(req.headers.authtoken);
            var owner = await ownerDAL.getByID(userID);
            let product = await productDAL.addProduct(name, category, ingredients, description, picture, prodId.toString());
            productsInStoreDAL.addProducttoStore(owner.store.id, prodId.toString(), price);
            return res.send('ok!');
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    getTopTenRecommended: async function (req){
        let userID = await utils.getIdByToken(req.headers.authtoken);
        var data = await purchaseDAL.allPuchaseIdAndChildId();
        var children = Object.keys(data);
        var header = {}
        var records = []
        for (let i = 0; i < children.length; i++) {
            records.push({...data[children[i]], child: children[i]})

            childPurchases = Object.keys(data[children[i]])
            for (let j = 0; j < childPurchases.length; j++) {
                if(!header[childPurchases[j]]){
                    header[childPurchases[j]] = {id: childPurchases[j], title: childPurchases[j]};
                }
                
            }
            
        }
        header = Object.values(header)
        header.unshift({id: 'child', title: 'child'})
        if (!fs.existsSync(csvDir)){
            fs.mkdirSync(csvDir);
        }
        const csvWriter = createCsvWriter({
            path: csvDir + '/child-purchase' + '.csv',
            header: header
        });
         
        csvWriter.writeRecords(records) 
            .then(() => {
                console.log('...Done');
            });
    }


}

