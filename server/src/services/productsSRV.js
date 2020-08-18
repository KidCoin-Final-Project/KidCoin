const productDAL = require('../dal/productDAL')

module.exports = {
    getAll: function(){
        return productDAL.getAll().then(doc => {
            if (doc.empty) {
                console.log('couldnt find products.');
                return;
            }
            return doc.docs;
        });
    },

    getByID: function(ID){
        return productDAL.getByID(ID).then(doc => {
            if (doc.empty) {
                console.log('couldnt find product.');
                return;
            }

            return {
                'category:': doc._fieldsProto.category.stringValue,
                'ingredients': doc._fieldsProto.ingredients.stringValue,
                'name': doc._fieldsProto.name.stringValue,
                'picture': doc._fieldsProto.picture.stringValue,
                'description': doc._fieldsProto.description.stringValue,
                'productID': doc._fieldsProto.productID.stringValue,
                'money': doc._fieldsProto.money.stringValue,
                'reviews': doc._fieldsProto.reviews
            };
        });
    },

    getByCategory: function(category){
        return productDAL.getByCategory(category).then(doc => {
            if(doc.empty) {
                console.log('couldnt find category. ');
                return
            }
            var products = []
            for(let i=0;i<doc.length;i++){
                products.push({
                    'category:': doc[i]._fieldsProto.category.stringValue,
                    'ingredients': doc[i]._fieldsProto.ingredients.stringValue,
                    'name': doc[i]._fieldsProto.name.stringValue,
                   'picture': doc[i]._fieldsProto.picture.stringValue,
                   'description': doc[i]._fieldsProto.description.stringValue,
                   'productID': doc[i]._fieldsProto.productID.stringValue,
                   'money': doc[i]._fieldsProto.money.stringValue,
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

