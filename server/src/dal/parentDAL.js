const db = require('../misc/firebase-admin').database

module.exports = {


    approveChild: function(parentID, childEmail){
        return db.collection('parent').doc(parentID).get()
        .then(doc => {
            var pendingChildrenArr = doc.data().pendingChildren;
            if(!pendingChildrenArr){
                return false;
            }
            for(var i = 0; i < pendingChildrenArr.length; i++){
                if(pendingChildrenArr[i].email == childEmail){
                    var childrenArr =  doc.data().children;
                    childrenArr.push(db.collection('child').doc(pendingChildrenArr[i].childID))
                    pendingChildrenArr = pendingChildrenArr.splice(pendingChildrenArr, i);
                    return db.collection('parent').doc(parentID).update({pendingChildren: pendingChildrenArr,children: childrenArr})
                }
            }
            
        });
    },

    addParent: function (userId) {
        return db.collection('parent').doc(userId).set({
            children: [],
            pendingChildren: []
        });
    },
    getByID: function (userId) {
        return db.collection('parent')
            .doc(userId)
            .get()
            .then(doc => {
                if(doc.exists){
                    return doc.data()
                }
                return undefined;
            })
            .catch(err => {
                throw new Error('something bad happened: ' + err);
            })
    },
    addPendingChild: function(parentID, childEmail, childID){
        return db.collection('parent').doc(parentID).get()
        .then(doc => {
            var pendingChildrenArr = doc.data().pendingChildren;
            if(!pendingChildrenArr){
                pendingChildrenArr = [];
            }
            pendingChildrenArr.push({email:childEmail, childID: childID});
            return db.collection('parent').doc(parentID).update({pendingChildren: pendingChildrenArr})
        });
    }
    
}