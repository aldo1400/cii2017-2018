var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userpostmasterSchema = new Schema({
    email: {type:String, unique:true},
    name: String,
    lastname: String,
    dni: {type:String, unique:true},
    institute: String,
    cellphone: String,
    type: String,
    eventType: String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('UserPostMaster',userpostmasterSchema);
