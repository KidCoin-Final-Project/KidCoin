const productDAL = require('../dal/productDAL')

module.exports = {
    getAll: function(){
        return productDAL.getAll();
    },

    getByID: function(ID){
        return productDAL.getByID(ID);
    }
}