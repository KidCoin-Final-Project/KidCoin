const firebase = require('../misc/firebase-admin');
const userDAL = require('../dal/userDAL')
const childDAL = require('../dal/childDAL')
const parentDAL = require('../dal/parentDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils');
const storeSRV = require('./storeSRV');

module.exports = {
    signup: async function (req, res) {
        const {
            email,
            type,
            phoneNumber,
            password,
            firstName,
            lastName,
            parentEmail,
            age,
            sex,
            store,
            picture,
            file
        } = req.body;

        if (type!='child' && type!='parent' && type!='owner') {
            return res.status(500).send("unknown user type");
        }
        if (!email || !password) {
            return res.send(500);
        }
        try {
            let user;
            if (type == 'child') {
                if (!parentEmail ) {
                    return res.status(400).send("missing params");
                }
                let parentUser = await userDAL.getByEmail(parentEmail);
                if (!parentUser.type == "parent") {
                    return res.send(500, "Parent does not exist");
                }
                user = await firebase.auth.createUser({
                    email: email,
                    password: password
                });
                try{
                    await userDAL.addUser(user.uid, firstName, lastName, phoneNumber, type, picture);
                    await childDAL.addChild(user.uid);
                    await parentDAL.addPendingChild(parentUser.id, email, user.uid);
                } catch(e){
                    firebase.auth.deleteUser(user.uid);
                    throw e;
                }
            } else {
                user = await firebase.auth.createUser({
                    email: email,
                    password: password
                });
            }
            console.log(user);
            try {
                if (user) {
                    if (type == 'parent') {
                        await userDAL.addUser(user.uid, firstName, lastName, phoneNumber, type);
                        await parentDAL.addParent(user.uid);
                    } else if (type == 'owner') {
                        await userDAL.addUser(user.uid, firstName, lastName, phoneNumber, type, picture);
                        newStore = await storeSRV.addStore(store, user.uid);
                        ownerDAL.addOwner(user.uid, newStore)

                    }
                }
            } catch (e) {
                firebase.auth.deleteUser(user.uid)
                if(e == 'missing params'){
                    return res.status(400).send(e);
                }
                return res.send(e);
            }
            var token = await firebase.auth.createCustomToken(user.uid).then((token) => { return token; });
            return res.send({
                'uid': user.uid,
                'token': token
            });
        } catch (e) {
            return res.send(500,e.message);
        }
    },
    userByToken: function (req, res) {
        var token = req.headers.authtoken;
        firebase.auth.verifyIdToken(token).then(async (decodedToken) => {
            var user = await userDAL.getByUid(decodedToken.uid);
            var userInfo = {
                'uid': decodedToken.uid,
                'type': user.type,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'phoneNumber': user.phoneNumber
            };
            if (user.type == 'child') {
                var child = await childDAL.getByID(userInfo.uid)
                userInfo.balance = child.balance;
                userInfo.parent = child.parent;
            } else if (user.type == 'parent') {
                var parent = await parentDAL.getByID(userInfo.uid);                
                userInfo.children = [];
                for(var i = 0; i< parent.children.length; i++){
                    userInfo.children.push({id:parent.children[i].id});
                }
            } else if (user.type == 'owner') {
                var owner = await ownerDAL.getByID(userInfo.uid);
                userInfo.store = owner.store;
            }
            res.send(userInfo);
        })
    },
    deleteAllUsers: function () {
        firebase.auth.listUsers(1000)
            .then(function (listUsersResult) {
                listUsersResult.users.forEach(function (userRecord) {
                    console.log('user', userRecord.toJSON());
                    firebase.auth.deleteUser(userRecord.uid)
                        .then(function () {
                            console.log('Successfully deleted user');
                        })
                });
            });
    }
}

