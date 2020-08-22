const auth = require('./firebase-admin').auth

module.exports = {

    getIdByToken: async function (token) {
        return auth.verifyIdToken(token).then(decodedToken =>{
            return decodedToken.uid;
        })
    }
}