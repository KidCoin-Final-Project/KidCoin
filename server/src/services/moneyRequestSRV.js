const utils = require('../misc/utils')
const moneyRequestsDAL = require('../dal/moneyRequestDAL')
const usersDAL = require('../dal/userDAL')
const parentDAL = require('../dal/parentDAL')

module.exports = {
    newRequest: async function (req, res) {
        const {
            amount
        } = req.body;
        const childId = await utils.getIdByToken(req.headers.authtoken);
        if (!amount) {
            return res.send(400, "missing params");
        }
        try {
            let moneyRequest = await moneyRequestsDAL.requestMoneyFromParent(childId, amount);
            return res.send(200,{
                'moseyRequestUid': moneyRequest.id
            });
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    allRequests: async function (req, res){
        const userID = await utils.getIdByToken(req.headers.authtoken);
        const user = await usersDAL.getByID(userID);
        const daysBack = req.query.daysBack
        let moneyRequests = [];
        if(user.type == 'child'){
            moneyRequests = await moneyRequestsDAL.getAllByChildId(userID);
        } else if (user.type == 'parent'){
            let childID = req.query.childID;
            if(!childID){
                return res.send(400, "missing params: childID");
            }
            let parent = await parentDAL.getByID(userID);
            for (let i = 0; i < parent.childrens.length; i++) {
                if(parent.childrens[i].id == childID){
                    moneyRequests = await moneyRequestsDAL.getAllByChildId(parent.childrens[i].id);
                    return res.send(moneyRequests);
                }
            }
            return res.send(400, "child not found");
        }
    }

}