const admin = require('firebase-admin');
const apiKey = require('../../config/apiKey.json');
const rp = require('request-promise');

module.exports = {
    getIdToken: async function (uid){
        const customToken = await admin.auth().createCustomToken(uid)
        const res = await rp({
          url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey.key}`,
          method: 'POST',
          body: {
            token: customToken,
            returnSecureToken: true
          },
          json: true,
        });
        return res.idToken;
      }
}