var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var paymentSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'User'},
    quantity:{type:Number},
    type:String,
    createdAt:{ type: Date,default: Date.now}
});

module.exports = mongoose.model('Payment',paymentSchema);
