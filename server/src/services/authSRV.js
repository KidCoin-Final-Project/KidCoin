const firebase = require('../utils/firebase-admin');
const userDAL = require('../dal/userDAL')
const childDAL = require('../dal/childDAL')
const parentDAL = require('../dal/childDAL')
const ownerDAL = require('../dal/childDAL')

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
            if (user) {
                await userDAL.addUser(firstName, lastName, phoneNumber, type);
                if (type == 'child') {
                    await childDAL.addChild(type, user.uid);
                } else if (type == 'parent') {
                    await parentDAL.addParent(type, user.uid);
                } else if (type == 'owner') {
                    await ownerDAL.addOwner(type, user.uid);
                }
            }
            return res.send(user);
        } catch (e) {
            return res.send(e);
        }
    }
}