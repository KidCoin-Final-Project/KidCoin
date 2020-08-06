const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 5050
const admin = require('firebase-admin');
const db = require('../server/src/misc/firebase-admin').database



app.use(bodyParser.json())
app.use(cors())

app.get('/transactionById/:transID', async (req, res) => {
    return res.send(await db.collection('bankHistory').doc(req.params.transID).get().then((doc) =>{
        var data = doc.data()
        return {
            from: data.from.id,
            to: data.to.id,
            amount: data.amount
        }
    }))
})

app.post('/transfer', async (req, res) => {
    const {
        amount,
        fromAccount,
        toAccount
    } = req.body;
    var trans = await transfer(fromAccount.toString(), toAccount.toString(), amount);
    return res.send(trans);
})

app.post('/chargeCard', async (req, res) => {
    const {
        amount,
        cardNumber,
        expirationDate,
        cardSecurityCode,
        cardHolderId,
        cardHolderName,
        toAccount
    } = req.body;
    return await db.collection('creditCards')
            .doc(cardNumber)
            .get()
            .then(async doc =>{
                if(isCardEqual(doc.id, doc.data(), cardNumber, expirationDate, cardSecurityCode, cardHolderId, cardHolderName)){
                    var trans = await transfer(cardHolderId.toString(), toAccount.toString(), amount);
                    return res.send(trans)
                } else {
                    return res.send(403, "card is not valid");
                }
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
})

app.listen(port, () => {
  console.log(`bank app listening at http://localhost:` + port)
})

function isCardEqual(firstCardNumber, card, 
    cardNumber,
    expirationDate,
    cardSecurityCode,
    cardHolderId,
    cardHolderName){

    if((firstCardNumber == cardNumber) && 
    (card.expireDate == expirationDate) && 
    (card.securityCode == cardSecurityCode) && 
    (card.holderID == cardHolderId) && 
    (card.holderName == cardHolderName)){
        return true;
    }
    return false;
}

async function transfer(from, to, amount){
    return await db.collection('bankAccount')
    .doc(from)
    .get()
    .then(async doc =>{
            var newAmount = doc.data().credit - amount;
            await db.collection('bankAccount').doc(from).update({credit: newAmount});

            return await db.collection('bankAccount')
            .doc(to)
            .get()
            .then(async doc =>{
                    var newAmount = doc.data().credit + amount;
                    await db.collection('bankAccount').doc(to).update({credit: newAmount});

                    var history = await db.collection('bankHistory').add({
                        from: db.collection('bankAccount').doc(from),
                        to: db.collection('bankAccount').doc(to),
                        amount: amount,
                        //date: admin.firestore.Timestamp.fromDate(new Date())
                    })
                    return {transactionId: history.id}
                })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
        })
    .catch(err => {
        throw new Error('something bad happened: ' + err);
    })
}