const auth = require('./firebase-admin').auth
const usersDAL = require('../dal/userDAL')

module.exports = {

    getIdByToken: function (token) {
        return auth.verifyIdToken(token).then(decodedToken =>{
            return decodedToken.uid;
        })
    },
    getUserType: function (authtoken){
        return this.getIdByToken(authtoken).then(uid =>{
            return usersDAL.getByID(uid).then(user => {
                return user.type;
            })
        });
    },
}