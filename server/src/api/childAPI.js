const express = require('express');
const router = express.Router();
const childSRV = require('../services/childSRV')
const parentSRV = require('../services/parentSRV')
const middleware = require('../misc/middleware')



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


/**
 * approve a child by Email
 * @route post /approve/:childEmail
 * @group child api
 * @param {string} childEmail.url.required - child's Email 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/approve/:childEmail', middleware.isUserParent, function (req, res) {
    return parentSRV.approveChild(req, res);
});

module.exports = router;