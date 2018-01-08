var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var userSchema = new Schema({
    email: {type:String, unique:true},
    name: String,
    lastname: String,
    city: String,
    institution:String,
    delegation:String,
    cellphone: String,
    dni: {type:String, unique:true},
    type: {type: Schema.ObjectId, ref: 'Type'},
    debt:{type:Number},
    discount:{type:Number},
    eventType: String,
    photo:String,
    password:String,
    description:String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
