const express = require('express');
const router = express.Router();
const parentSRV = require('../services/parentSRV')

router.get('/:parentID', function (req, res) {
    parentSRV.getByID(req.params.parentID).then(parent => {
        return res.send(parent);
    });
});

module.exports = router;