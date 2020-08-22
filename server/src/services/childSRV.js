const childDAL = require('../dal/childDAL')
const userDAL = require('../dal/userDAL')
const utils = require('../misc/utils');

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
    },
    addRestriction: async function (req, res) {
        var userId = await utils.getIdByToken(req.headers.authtoken);
        if(!req.body.productId){
            return res.status(400).send('missing params')
        }
        return childDAL.addRestriction(req.params.childID, req.body.productId).then(async doc => {
            if (!doc) {
                console.log('couldnt find child.');
                throw(404);
            }
            return res.send('ok!')
        });
    }
}