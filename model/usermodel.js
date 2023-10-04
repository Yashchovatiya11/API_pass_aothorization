var mongoose = require('mongoose');

//shema 

var user_schema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }

});

//model

module.exports = mongoose.model('user_auth',user_schema);