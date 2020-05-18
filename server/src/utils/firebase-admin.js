const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase-service-account.json')
// Initialize the default app
var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.database = admin.firestore();
exports.auth = admin.auth();
exports.serviceAccount = serviceAccount;
