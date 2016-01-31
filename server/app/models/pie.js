var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PieSchema = new Schema({
    adjective: 	String,
    name: 		String,
    creator: 	Schema.ObjectId,
    created: 	Date
});

module.exports = mongoose.model('Pie', PieSchema);
