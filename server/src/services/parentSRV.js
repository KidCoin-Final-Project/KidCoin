const parentDAL = require('../dal/parentDAL')

module.exports = {

    getByID: function (userId) {
        return parentDAL.getByID(userId).then(doc => {
            if (!doc.exists) {
                console.log('couldnt find parent.');
                return;
            }
            return doc.data();
        });
    }
}