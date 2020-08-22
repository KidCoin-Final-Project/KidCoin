const childDAL = require('../dal/childDAL')
const parentDAL = require('../dal/parentDAL')
const userDAL = require('../dal/userDAL')
const utils = require('../misc/utils');
const firebase = require('../misc/firebase-admin');


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
        if(!req.body.productIds){
            return res.status(400).send('missing params')
        }
        return childDAL.addRestriction(req.params.childID, req.body.productIds).then(async doc => {
            if (!doc) {
                console.log('couldnt find child.');
                throw(404);
            }
            return res.send('ok!')
        });
    },
    removeRestriction: async function (req, res) {
        if(!req.body.productIds){
            return res.status(400).send('missing params')
        }
        return childDAL.removeRestriction(req.params.childID, req.body.productIds).then(async doc => {
            if (!doc) {
                console.log('couldnt find child.');
                throw(404);
            }
            return res.send('ok!')
        });
    },
    deleteChild: async function(req, res){
        try{
            firebase.auth.deleteUser(req.params.childID)
            childDAL.deleteChild(req.params.childID)
            parentDAL.removeChild(await utils.getIdByToken(req.headers.authtoken), req.params.childID);
            return res.send('ok!');
        } catch(e){
            if(e == 404){
                return res.status(404).send(e)
            }
            return res.status(500).send(e)
        }
    }
}