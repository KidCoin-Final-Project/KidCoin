const express = require('express');
const router = express.Router();
const parentSRV = require('../services/parentSRV')

/**
 * get the child info by id
 * @route get /parent/:parentID
 * @group parent api
 * @param {string} childID.url.required - parent's uid 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/:parentID', function (req, res) {
    parentSRV.getByID(req.params.parentID).then(parent => {
        return res.send(parent);
    });
});

module.exports = router;