const db = require('../misc/firebase-admin').database

module.exports = {

    addReview: function (parentId, productId, rating, comment) {
        return db.collection('productReview').add({
            parent: db.collection('parent').doc(parentId),
            product: db.collection('product').doc(productId),
            rating: rating,
            comment: comment
        })
    },
    getByProductId: function (productId) {
        return db.collection('productReview')
            .where('product', '==', db.collection('product').doc(productId))
            .get()
            .then(docs => {
                let reviews = []
                docs.forEach(review => {
                    reviews.push({
                        'rating': review.data().rating,
                        'comment': review.data().comment,
                        'uid': review.id
                    })
                });
                return reviews;
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
}