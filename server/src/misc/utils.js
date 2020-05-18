const auth = require('./firebase-admin').auth

module.exports = {

    getIdByToken: function (token) {
        auth.verifyIdToken(token).then(decodedToken =>{
            
        })
    }
}