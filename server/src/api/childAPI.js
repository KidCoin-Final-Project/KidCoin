const express = require('express');
const router = express.Router();
const childSRV = require('../services/childSRV')
const transactionSRV = require('../services/purchaseSRV')


/**
 * get the child info by id
 * @route get /child/:childID
 * @group child api
 * @param {string} childID.url.required - child's uid 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/:childID', function (req, res) {
    childSRV.getByID(req.params.childID).then(child => {
        return res.send(child);
    });
});

module.exports = router;