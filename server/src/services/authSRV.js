const firebase = require('../utils/firebase-admin');
const userDAL = require('../dal/userDAL')
const childDAL = require('../dal/childDAL')
const parentDAL = require('../dal/parentDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../utils/utils')

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
        try {
            const user = await firebase.auth.createUser({
                email: email,
                password: password
            });
            console.log(user);
            try{
                if (user) {
                    await userDAL.addUser(user.uid, firstName, lastName, phoneNumber, type);
                    if (type == 'child') {
                        await childDAL.addChild(user.uid);
                    } else if (type == 'parent') {
                        await parentDAL.addParent(user.uid);
                    } else if (type == 'owner') {
                        await ownerDAL.addOwner(user.uid);
                    }
                }
            } catch (e) {
                firebase.auth.deleteUser(user.uid)
                return res.send(e);
            }
            var token = await utils.getIdToken(user.uid);
            return res.send({
                'uid': user.uid,
                'token': token
            });
        } catch (e) {
            return res.send(e);
        }
    },
    userByToken: function(req, res){
        var token = req.headers.authtoken;
        firebase.auth.verifyIdToken(token).then(async (decodedToken) => {
            var user;
            await userDAL.getByUid(decodedToken.uid).then(doc => {
                user = doc
            });
            var userInfo = {
                'uid' : decodedToken.uid,
                'type' : user.type,
                'firstName' : user.firstName,
                'lastName' : user.lastName,
                'phoneNumber' : user.phoneNumber
            };
            if(user.type == 'child'){
                var child;
                await childDAL.getByID(userInfo.uid).then(doc =>{
                    child = doc;
                });
                userInfo.balance = child.balance;
                userInfo.parent = child.parent;
            } else if(user.type == 'parent'){
                var parent;
                await parentDAL.getByID(userInfo.uid).then(doc =>{
                    parent = doc;
                });
                userInfo.childrens = parent.childrens;
            } else if(user.type == 'owner'){
                var owner;
                await ownerDAL.getByID(userInfo.uid).then(doc =>{
                    owner = doc;
                });
                userInfo.store = owner.store;
            }
            res.send(userInfo);
        })
    }
}

