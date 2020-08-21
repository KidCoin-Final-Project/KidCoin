const express = require('express');
const router = express.Router();
const authSRV = require('../services/authSRV')
const firebase = require('../misc/firebase-admin');

/**
 * signup a user
 * @route POST /auth/signup
 * @group auth api
 * @param {string} email.body.required - user's email 
 * @param {string} password.body.required - user's password.
 * @param {string} phoneNumber.body.required - user's phone number
 * @param {string} type.body.required - type of the user
 * @param {string} firstName.body.required - user's first name
 * @param {string} lastName.body.required - user's last name
 * @param {string} parentEmail.body - only for child
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', function (req, res){
    authSRV.signup(req, res);
});

/**
 * user info by token
 * @route get /auth/userByToken
 * @group auth api
 * @returns {object} 200 - user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/userByToken', function (req, res){
    authSRV.userByToken(req, res);
});

/**
 * user info by token
 * @route get /auth/userByToken
 * @group auth api
 * @returns {object} 200 - user info
 * @returns {Error}  default - Unexpected error
 */
router.delete('/all', function (req, res){
    if(req.headers.imsure == 'yes'){
        firebase.auth.listUsers().then(docs =>{
            users = docs.users
            for (let i = 0; i < users.length; i++) {
                firebase.auth.deleteUser(users[i].uid);
                var start = new Date()
                var end = start;
                while(end-start<1000){
                    end = new Date();
                }
                console.log('deleted' + users[i].uid);
            }
            return res.send('you just deleted a lot of users!')
        })
    } else{
        return res.status(405).send('i dont think you mean it!')
    }
});

module.exports = router;