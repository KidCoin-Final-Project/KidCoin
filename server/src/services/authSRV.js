const firebase = require('../utils/firebase-admin');

module.exports = {
    signup: async function (req, res) {
        const {
            email,
            type,
            phoneNumber,
            password,
            firstName,
            lastName
        } = req.body;

        if (!email || !password) {
            return res.send(500);
        }
        try{        
            const user = await firebase.auth.createUser({
                email: email,
                password: password
            });
            console.log(user);
            if (user) {
                firebase.database.collection('user').doc(user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    type: type
                });
                if(type == 'child'){
                    firebase.database.collection(type).doc(user.uid).set({
                        balance: 0
                    });
                } else if(type == 'parent'){
                    firebase.database.collection(type).doc(user.uid).set({
                        childrens: []
                    });
                } else if(type == 'owner'){
                    firebase.database.collection(type).doc(user.uid).set({
                        store: ''
                    });
                }
            }
            return res.send(user);
        } catch(e){
            return res.send(e); 
        }
    }
}