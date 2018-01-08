var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var assistSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'User'},
    createdAt:{ type: Date}
});

module.exports = mongoose.model('Assist',assistSchema);
