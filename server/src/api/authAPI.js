const express = require('express');
const router = express.Router();
const authSRV = require('../services/authSRV')

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

module.exports = router;