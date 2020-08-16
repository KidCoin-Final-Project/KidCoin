const childDAL = require('../dal/childDAL')
const userDAL = require('../dal/userDAL')

module.exports = {

    getByID: function (userId) {
        return childDAL.getByID(userId).then(async doc => {
            if (!doc) {
                console.log('couldnt find child.');
                throw(404);
            }
            var userData = await userDAL.getByUid(userId);
            return {
                ...doc,
                ...userData
            };
        });
    }
}