const utils = require('../misc/utils')
const moneyRequestsDAL = require('../dal/moneyRequestDAL')
const usersDAL = require('../dal/userDAL')
const parentDAL = require('../dal/parentDAL')
const childDAL = require('../dal/childDAL')
const conf = require('../../config/conf.json')
const request = require('request-promise');


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
    },
    accept: async function (req, res){
        var moneyRequest = await moneyRequestsDAL.getById(req.params.reqId);
        if(!moneyRequest){
            return res.status(404).send("money request not found!");
        }
        var parent = await parentDAL.getByID(await utils.getIdByToken(req.headers.authtoken));

        parent.childrens.forEach(child => {
            if(moneyRequest.childID == child.id){
                checkTransferAndAddCreditsToChild(req.body.transId, moneyRequest.childID);
                moneyRequestsDAL.markAsAccepted(moneyRequest.uid);
                return res.send(moneyRequestsDAL.getById(req.query.reqId));
            }
        });
    }

}

function checkTransferAndAddCreditsToChild(transferId, childId){
    if(moneyRequestsDAL.checkIfTransAccepted(transferId)){
        return false;
    }
    request({uri: conf.bankUrl + transferId, json:true}).then((trans) => {
        if(trans.to == conf.bankAccount){
            moneyRequestsDAL.acceptTransaction(transferId);
            childDAL.addBalance(childId, trans.amount);
            return trans.amount;
        }
    }).catch(function (err) {
        return false;        
    });
}