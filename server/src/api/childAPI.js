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
    }).catch(e =>{
        if(e == 404){
            res.status(404).send("couldnt find child.")
        } else {
            res.status(500).send("internal server error")
        }
    });
});


/**
 * approve a child by Email
 * @route post /child/approve/:childEmail
 * @group child api
 * @param {string} childEmail.url.required - child's Email 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/approve/:childEmail', middleware.isUserParent, function (req, res) {
    return parentSRV.approveChild(req, res);
});

/**
 * approve a child by Email
 * @route post /child/restrict/:childId
 * @group child api
 * @param {string} childID.url.required - child's ID 
 * @param {string} productId.body.required - productId to restrict 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/restrict/:childID', middleware.isChildOfParent, function (req, res) {
    return childSRV.addRestriction(req, res);
});

module.exports = router;