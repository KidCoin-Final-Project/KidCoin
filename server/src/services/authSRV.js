const firebase = require('../misc/firebase-admin');
const userDAL = require('../dal/userDAL')
const childDAL = require('../dal/childDAL')
const parentDAL = require('../dal/parentDAL')
const ownerDAL = require('../dal/ownerDAL')

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
            var token = await firebase.auth.createCustomToken(user.uid).then((token) => {return token;});
            return res.send({
                'uid': user.uid,
                'token': token
            });
        } catch (e) {
            return res.send(e);
        }
    }
}