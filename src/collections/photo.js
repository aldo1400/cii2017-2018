var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var photoSchema = new Schema({
    photo: String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Photo',photoSchema);
