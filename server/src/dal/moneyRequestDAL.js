const db = require('../misc/firebase-admin').database
const admin = require('firebase-admin');
module.exports = {

    requestMoneyFromParent: function (childId, amount) {
        return db.collection('moneyRequest').add({
            child: db.collection('child').doc(childId),
            amount: amount,
            requestDate: admin.firestore.Timestamp.fromDate(new Date()),
            accepted: false
        })
    },
    getAllByChildId: function (childId){
        return db.collection('moneyRequest')
        .where('child', '==', db.collection('child').doc(childId))
        .orderBy('requestDate')
        .get().then(docs => {
            let moneyRequestsData = []
            docs.docs.forEach(moneyRequest => {
                moneyRequestsData.push({
                    'amount': moneyRequest.data().amount,
                    'requestDate': moneyRequest.data().requestDate,
                    'accepted': moneyRequest.data().accepted,
                    'acceptedDate': moneyRequest.data().acceptedDate,
                    'childID': moneyRequest.data().child.id,
                    'uid': moneyRequest.id
                })
            });
            return moneyRequestsData;
        })
    }

}