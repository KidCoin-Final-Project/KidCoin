
const moneyTransferDAL = require('../dal/moneyTransferDAL')

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
            return res.send(request);
        } catch (e) {
            return res.send(e);
        }
    }
}