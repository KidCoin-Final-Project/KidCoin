const express = require('express');
const router = express.Router();
const storeSRV = require('../services/storeSRV')
const middleware = require('../misc/middleware')

/**
 * get stores if name contains
 * @route get /store/byName
 * @group store api
 * @param {string} storeName.query.required - name to search fot
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/byName', function (req, res) {
    storeSRV.getByName(req, res).then(store => {
        return res.send(store);
    });
});


/**
 * get stores near by
 * @route get /store/byLocation
 * @group store api
 * @param {string} longitude.query.required - longitude
 * @param {string} latitude.query.required - latitude
 * @param {number} maxDistanceInMeters.query - maximum distance to the store
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/byLocation', function (req, res) {
    storeSRV.getBylocation(req, res).then(store => {
        return res.send(store);
    });
});

/**
 * @typedef location
 * @property {number} longitude.required - longitude
 * @property {number} latitude.required - latitude
 */


/**
 * make a new store - only for store owner - owner is taken from token
 * @route POST /store/
 * @group store api
 * @param {string} storeName.body.required - store name
 * @param {location.model} location.body.required - location
 * @param {string} address.body.required - string address 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', middleware.isUserOwner, function (req, res) {
    storeSRV.addStore(req, res);
});

/**
 * get all stores
 * @route get /store/allStores
 * @group store api
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/allStores', function (req, res) {
    storeSRV.getAllStore(req, res).then(stores => {
        return res.send(stores);
    });
});

module.exports = router;