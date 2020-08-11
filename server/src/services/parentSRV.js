const parentDAL = require('../dal/parentDAL')
const utils = require('../misc/utils')
module.exports = {

    getByID: function (userId) {
        return parentDAL.getByID(userId).then(doc => {
            if (!doc.exists) {
                console.log('couldnt find parent.');
                return;
            }
            return doc.data();
        });
    },
    approveChild: async function(req, res){
        parentId = await utils.getIdByToken(req.headers.authtoken)
        try{
            if(!(await parentDAL.approveChild(parentId, req.params.childEmail))){
                return res.status(400).send("child is not pending!");
            } 
        } catch(e){
            return res.status(500).send(e)
        }
        return res.send("child got approved!");
    }
}