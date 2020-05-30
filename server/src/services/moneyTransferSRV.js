
const moneyTransferDAL = require('../dal/moneyTransferDAL')
//const sendEmailUtil = require('../utils/Email')

module.exports = {
    requestMoneyFromParent: async function (req, res) {
        const {
            childId,
            amount
        } = req.body;

        if (!childId || !amount) {
            return res.send(500);
        }
        try {
            let request = await moneyTransferDAL.requestMoneyFromParent(childId, amount);
            //sendEmailUtil.sendEmail()
            return res.send(request);
        } catch (e) {
            return res.send(e);
        }
    }
}