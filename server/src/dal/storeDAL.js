const db = require('../misc/firebase-admin').database
const geoLib = require('geolib')

module.exports = {

    getById: function (Id){
        return db.collection('store').doc(Id).get().then(doc =>{
            if(!doc.exist){
                return {...doc.data(), id: doc.id};
            }
            return undefined;
        })
    },
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
                for (let i = 0; i < docs.docs.length; i++) {
                    var store = docs.docs[i];
                    var storeData = {...store.data()}
                    storeData.owner = storeData.owner.id
                    storeData.distance = geoLib.getDistance(location, storeData.location)
                    if (storeData.distance && storeData.distance < maxDistanceInMeters) {
                        stores.push(storeData)
                    }
                }
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
    addStore: function (store,ownerID) {
        return db.collection('store').add({
            storeName: store.storeName,
            location: store.location,
            owner: db.collection('owner').doc(ownerID),
            address: store.address,
            bankAccount: store.bankAccount
        });
    },
    deleteStore: function (storeID) {
        return db.collection('store').doc(storeID).delete();
    },
    getAllStore: function () {
        return db.collection('store').get().then((result) => {
            let stores = [];
            for (let i = 0; i < result.size; i++) {
                let store = result.docs[i].data();
                stores.push({
                    'name': store.name,
                    'address': store.address,
                    'location': store.location
                })
            }
            return stores;
        });
    }
}