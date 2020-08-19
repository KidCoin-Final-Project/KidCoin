const productDAL = require('../dal/productDAL')
const productReviewSRV = require('./productReviewSRV')

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
                   'avgRating': await productReviewSRV.getAvgRatingByProductId(docs[i].id)
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

    getByCategory: function(category){
        return productDAL.getByCategory(category).then(async doc => {
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
            name, category, ingredients, description, money, picture, productID
        } = req.body.params;
        try {
            let product = await productDAL.addProduct(name, category, ingredients, description, money, picture.split('\\')[picture.split('\\').length-1], productID);
            let documentId = product._path.segments["1"];
            return res.send(documentId).end();
        } catch (e) {
            return res.status(500).send(e);
        }
    },


}

