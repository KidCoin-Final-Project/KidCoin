const auth = require('./firebase-admin').auth

module.exports = {

    authenticate: function (req, res, next) {
        if (req.headers.env == "test") {
            return next();
        }
        console.log("authenticating users");
        try {
            if (!req.headers.authtoken) {
                console.log('no token found')
                throw ('no token found');
            }
            authToken = req.headers.authtoken;
            auth.verifyIdToken(authToken).then((data) => {
                console.log(data);
            });
            next();
        } catch{
            return res.status(401).send({ error: 'unauthorized user!' });
            //should throw an error....
        }
    },


    addHeaders: function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    }
}