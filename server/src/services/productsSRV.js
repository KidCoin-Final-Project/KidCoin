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
            return doc;
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
            name, category, ingredients, picture
        } = req.body.params;
        try {
            let product = await productDAL.addProduct(name, category, ingredients, picture);
            return res.send(200, {
                'product': product.name
            });
        } catch (e) {
            return res.status(500).send(e);
        }
    },


}

