var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = new Schema({
    email: 		String,
    usernames: [{ username:	String, created: Date }],
    password:  	String,
    admin:  	Boolean,
    created: 	Date 
});

module.exports = mongoose.model('User', UserSchema);
