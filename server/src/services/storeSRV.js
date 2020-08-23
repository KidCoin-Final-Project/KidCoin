const storeDAL = require('../dal/storeDAL')
const ownerDAL = require('../dal/ownerDAL')
const utils = require('../misc/utils')

module.exports = {

    getByName: async function (req, res) {
        const {
            storeName
        } = req.query;
        return await storeDAL.getByName(storeName);
    },
    getBylocation: async function (req, res) {
        var location = {}
        location.longitude = req.query.longitude
        location.latitude = req.query.latitude
        var maxDistanceInMeters = 9999999
        if (req.query.maxDistanceInMeters) {
            maxDistanceInMeters = req.query.maxDistanceInMeters;
        }
        location.latitude = Number(location.latitude)
        location.longitude = Number(location.longitude)
        return await storeDAL.getBylocation(location, maxDistanceInMeters);
    },

    addStore: async function (store, ownerID) {
        if (!store || 
            !store.storeName || 
            !store.address ||
            !store.bankAccount) {
            throw ('missing params');
        }
        return  await storeDAL.addStore(store, ownerID);
    },

    getAllStore: async function (req, res) {
        try {
            return await storeDAL.getAllStore();
        } catch (e) {
            return res.status(500).send(e);
        }
    },
}