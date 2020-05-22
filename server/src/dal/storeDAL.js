const db = require('../utils/firebase-admin').database
const geoLib = require('geolib')

module.exports = {

    getByName: function (storeName) {
        return db.collection('store')
            .get()
            .then((docs) => {
                var stores = [];
                docs.docs.forEach(store => {
                    var storeData = {}
                    storeData.name = store.data().name
                    storeData.address = store.data().address
                    if (store.data().location) {
                        storeData.location = {}
                        storeData.location.longitude = store.data().location._longitude
                        storeData.location.latitude = store.data().location._latitude
                    }
                    if (storeData.name && storeData.name.includes(storeName)) {
                        stores.push(storeData)
                    }
                })
                return stores;
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    getBylocation: function (location, maxDistanceInMeters) {
        return db.collection('store')
            .get()
            .then((docs) => {
                var stores = [];
                docs.docs.forEach(store => {
                    var storeData = {}
                    storeData.name = store.data().name
                    storeData.address = store.data().address
                    if (!store.data().location) {
                        return;
                    }
                    storeData.location = {}
                    storeData.location.longitude = store.data().location._longitude
                    storeData.location.latitude = store.data().location._latitude

                    storeData.distance = geoLib.getDistance(location, storeData.location)
                    if (storeData.distance && storeData.distance < maxDistanceInMeters) {
                        stores.push(storeData)
                    }
                })
                stores = stores.sort((store1, store2) => {
                    if (store1.distance < store2.distance) {
                        return store1;
                    }
                    return store2;
                })
                return stores;
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    addStore: function (storeName, location, owner, address) {
        return db.collection('store').add({
            storeName: storeName,
            location: location,
            owner: db.collection('owner').doc(owner),
            address: address
        });
    }
}