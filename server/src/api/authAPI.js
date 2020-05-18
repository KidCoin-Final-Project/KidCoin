const express = require('express');
const router = express.Router();
const authSRV = require('../services/authSRV')

router.post('/signup', function (req, res){
    authSRV.signup(req, res);
});


router.get('/userByToken', function (req, res){
    authSRV.userByToken(req, res);
});

module.exports = router;