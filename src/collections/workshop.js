var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var workshopSchema = new Schema({
    email: {type:String, unique:true},
    name: String,
    lastname: String,
    city: String,
    institution:String,
    type:String,
    cellphone: String,
    dni: {type:String, unique:true},
    list:{ type : Array , default : [] },
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Workshop',workshopSchema);
