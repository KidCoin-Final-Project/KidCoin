const childDAL = require('../dal/childDAL')

module.exports = {

    getByID: function (userId) {
        return childDAL.getByID(userId).then(res => {
            if (res.empty) {
                console.log('couldnt find child.');
                return;
            }
            return res.docs[0].data();
        });
    }
}