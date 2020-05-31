const auth = require('./firebase-admin').auth

module.exports = {

    getIdByToken: function (token) {
        return auth.verifyIdToken(token).then(decodedToken =>{
            return decodedToken.uid;
        })
    }
}