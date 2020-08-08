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
    },
    getById: function (id){
        return db.collection('moneyRequest')
        .doc(id)
        .get().then(doc => {
            if(!doc.exists){
                return undefined;
            }
            var moneyRequest = doc.data()
                return {
                    'amount': moneyRequest.amount,
                    'requestDate': moneyRequest.requestDate,
                    'accepted': moneyRequest.accepted,
                    'acceptedDate': moneyRequest.acceptedDate,
                    'childID': moneyRequest.child.id,
                    'uid': moneyRequest.id
                }
        })
    },
    checkIfTransAccepted: async function (transId){
        return await db.collection("transAccepted").doc(transId).get(doc).then((doc) => {
            return doc.exists;
        })
    },
    acceptTransaction: async function (transId){
        return db.collection('transAccepted').doc(transId).create({
            acceptedDate:admin.firestore.Timestamp.fromDate(new Date())
        });
    }

}