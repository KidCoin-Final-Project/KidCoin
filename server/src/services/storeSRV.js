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
        return await storeDAL.getBylocation(location, maxDistanceInMeters);
    },

    addStore: async function (req, res) {
        const {
            storeName,
            location,
            address
        } = req.body;
        let ownerID = await utils.getIdByToken(req.headers.authtoken);
        if (!storeName || !location || !ownerID || !address) {
            return res.send(500);
        }

        try {
            let store = await storeDAL.addStore(storeName, location, ownerID, address);
            ownerDAL.addOwner(ownerID, store).catch(e =>{
                store.delete();
                return res.status(500).send(e);
            });
            return res.send(store);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}