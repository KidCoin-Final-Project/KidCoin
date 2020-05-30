const storeDAL = require('../dal/storeDAL')

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
        return await storeDAL.getBylocation(location, maxDistanceInMeters);
    },

    addStore: async function (req, res) {
        const {
            storeName,
            location,
            ownerID,
            address
        } = req.body;

        if (!storeName || !location || !ownerID || !address) {
            return res.send(500);
        }
        try {
            let request = await storeDAL.addStore(storeName, location, ownerID, address);
            return res.send(request);
        } catch (e) {
            return res.send(e);
        }
    }
}