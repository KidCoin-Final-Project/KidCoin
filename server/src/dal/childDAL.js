const db = require('../utils/firebase-admin')

module.exports = {

    getByID: function (userId) {
        return db.database.collection('child')
            .where('firestore_user_id', '==', userId)
            .get()
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    }
}