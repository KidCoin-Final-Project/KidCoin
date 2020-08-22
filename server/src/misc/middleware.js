const auth = require('./firebase-admin').auth
const utils = require('../misc/utils')
const usersDAL = require('../dal/userDAL');
const parentDAL = require('../dal/parentDAL');

module.exports = {

    authenticate: function (req, res, next) {
        if (req.headers.env == "test") {
            return next();
        }
        console.log("authenticating users");
        try {
            let authtoken = req.headers.authtoken || req.body.headers.authtoken;
            if (!authtoken) {
                console.log('no token found')
                throw ('no token found');
            }
            auth.verifyIdToken(authtoken).then((data) => {
                console.log(data);
            });
            next();
        } catch{
            return res.status(401).send({ error: 'unauthorized user!' });
            //should throw an error....
        }
    },
    isUserChild: function (req, res, next){
        let authtoken = req.headers.authtoken || req.body.headers.authtoken;

        utils.getIdByToken(authtoken).then(uid =>{
            usersDAL.getByID(uid).then(user => {
                if(user.type != 'child'){
                    return res.status(401).send({ error: 'unauthorized user! user is not a child' });
                }
                next();
            })
        });
    },
    isUserParent: function (req, res, next){
        let authtoken = req.headers.authtoken || req.body.headers.authtoken;
        utils.getIdByToken(authtoken).then(uid =>{
            usersDAL.getByID(uid).then(user => {
                if(user.type != 'parent'){
                    return res.status(401).send({ error: 'unauthorized user! user is not a parent' });
                }
                next();
            })
        });
    },
    isUserOwner: function (req, res, next){
        utils.getIdByToken(req.headers.authtoken).then(uid =>{
            usersDAL.getByID(uid).then(user => {
                if(user.type != 'owner'){
                    return res.status(401).send({ error: 'unauthorized user! user is not an owner' });
                }
                next();
            })
        });
    },
    isChildOfParent: function (req, res, next){
        var childId = req.params.childID;
        utils.getIdByToken(req.headers.authtoken).then(uid =>{
            usersDAL.getByID(uid).then(user => {
                if(user.type != 'parent'){
                    return res.status(401).send({ error: 'unauthorized user! user is not a parent' });
                }
                parentDAL.getByID(uid).then(parent =>{
                        for(var i = 0;i<parent.children.length;i++){
                            if(parent.children[i].id == childId){
                                return next();
                            }
                        }
                        return res.status(401).send({ error: 'unauthorized user! child is not of this parent' });
                })
            })
        });
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