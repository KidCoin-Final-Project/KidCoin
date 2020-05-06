const childDAL = require('../dal/childDAL')

module.exports = {

    getByID: function (userId) {
        return childDAL.getByID(userId).then(doc => {
            if (!doc.exists) {
                console.log('couldnt find child.');
                return;
            }
            return doc.data();
        });
    }
}