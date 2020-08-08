const productReviewDAL = require('../dal/productReviewDAL')
const utils = require('../misc/utils')

module.exports = {

    addReview: async function (req, res) {
        const {
            product,
            rating,
            comment
        } = req.body;
        const parent = await utils.getIdByToken(req.headers.authtoken);
        if (!product || !rating) {
            return res.send(400, "missing params");
        }
        try {
            let productReview = await productReviewDAL.addReview(parent, product, rating, comment);
            return res.send(200, {
                'productReviewUid': productReview.id
            });
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    getByProductId: function (productId) {
        return productReviewDAL.getByProductId(productId).then(doc => {
            if (doc.length == 0) {
                console.log('couldnt find reviews.');
                return;
            }
            return doc;
        });
    }
}