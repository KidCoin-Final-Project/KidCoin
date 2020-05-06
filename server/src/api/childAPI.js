const express = require('express');
const router = express.Router();
const childSRV = require('../services/childSRV')

router.get('/:childID', function (req, res) {
    childSRV.getByID(req.params.childID).then(child => {
        return res.send(child);
    });
});

module.exports = router;