const express = require('express');
const router = express.Router();
const authSRV = require('../services/authSRV')

router.post('/signup', function (req, res){
    authSRV.signup(req, res);
});

module.exports = router;