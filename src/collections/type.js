var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var typeSchema = new Schema({
    name:String,
    amount:{type:SchemaTypes.Double},
    createdAt:{ type: Date,default: Date.now}
});

module.exports = mongoose.model('Type',typeSchema);
