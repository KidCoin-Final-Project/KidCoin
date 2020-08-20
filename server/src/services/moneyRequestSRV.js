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
            for (let i = 0; i < parent.children.length; i++) {
                if(parent.children[i].id == childID){
                    moneyRequests = await moneyRequestsDAL.getAllByChildId(parent.children[i].id);
                    return res.send(moneyRequests);
                }
            }
            return res.send(400, "child not found");
        }
    },
    allRequestsForParent: async function (req, res){
        const userID = await utils.getIdByToken(req.headers.authtoken);
        const user = await usersDAL.getByID(userID);
        let moneyRequests = [];
        if (user.type == 'parent'){
            let childID = req.query.childID;
            if(!childID){
                return res.send(400, "missing params: childID");
            }
            let parent = await parentDAL.getByID(userID);
            for (let i = 0; i < parent.children.length; i++) {
                if(parent.children[i].id == childID){
                    moneyRequests = await moneyRequestsDAL.getAllByChildId(parent.children[i].id);
                    return res.send(moneyRequests);
                }
            }
            return res.send(400, "child not found");
        }
    },
    accept: async function (req, res){
        var reqId = req.params.reqId;
        var transId = req.body.params.transId;
        if(!transId){
            return res.status(400).send("transaction id is missing!")
        }
        var moneyRequest = await moneyRequestsDAL.getById(reqId);
        if(!moneyRequest){
            return res.status(404).send("money request not found!");
        }
        if(moneyRequest.accepted){
            return res.status(404).send("money request already accepted!");
        }
        var parent = await parentDAL.getByID(await utils.getIdByToken(req.headers.authtoken));

        parent.children.forEach(child => {
            if(moneyRequest.childID == child.id){
                checkTransferAndAddCreditsToChild(transId, moneyRequest.childID)
                .then(async ()=>{
                    await moneyRequestsDAL.markReqAsAccepted(reqId);
                    return res.send(await moneyRequestsDAL.getById(reqId));
                })
                .catch(e =>{
                    return res.status(404).send("transaction does not exists or already accepted!");
                })
            }
        });
    }

}

async function checkTransferAndAddCreditsToChild(transferId, childId){
    if(await moneyRequestsDAL.checkIfTransAccepted(transferId)){
        throw false;
    }
    return request({uri: conf.bankUrl + "transactionById/" + transferId, json:true}).then((trans) => {
        if(trans.to == conf.bankAccount){
            moneyRequestsDAL.acceptTransaction(transferId);
            childDAL.addBalance(childId, trans.amount);
            return trans.amount;
        } else {
            throw false;
        }
    });
}