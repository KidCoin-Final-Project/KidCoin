const productDAL = require('../dal/productDAL')
const purchaseDAL = require('../dal/purchaseDAL')
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

    getByCategory: function(req){
        return productDAL.getByCategory(req.params.category).then(async doc => {
            if(doc.empty) {
                console.log('couldnt find category. ');
                return
            }
            var products = []
            for(let i=0;i<doc.length;i++){
                products.push({
                    ...doc[i].data(),
                   'avgRating': await productReviewSRV.getAvgRatingByProductId(doc[i].id)
                })
            }
            return products;
        });
    },


    addProduct: async function (req, res) {
        const {
            name, category, ingredients, description, picture, productID
        } = req.body.params;
        try {
            let product = await productDAL.addProduct(name, category, ingredients, description, picture.split('\\')[picture.split('\\').length-1]);
            let documentId = product._path.segments["1"];
            return res.send(documentId).end();
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

