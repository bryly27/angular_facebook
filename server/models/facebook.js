// we want to create a file that has the schema for our friends

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for our friends
var UsersSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	birthday: Date,
	gender: String,
	username: String,
	created_at: {type: Date, default: new Date},
	updated_at: Date,
	wall_messages: [{type: Schema.Types.ObjectId, ref: 'wall_message'}],
});

var Wall_messageSchema = new mongoose.Schema({
	message: String,
	created_by_username: String,
	created_by_fullname: String,
	created_for: {type: Schema.ObjectId, ref: 'user'},
	created_at: Date, 
	updated_at: Date,
	comments: Array,
	// wall_comments: [{type: Schema.Types.ObjectId, ref: 'wall_comment'}],
});

var Wall_commentSchema = new mongoose.Schema({
	comment: String,
	created_by_username: String,
	created_by_fullname: String,
	// comment_for: {type: Schema.ObjectId, ref: 'wall_message'},
	created_at: Date,
	updated_at: Date,
});


// create the model using that schema
// console.log("just created the model")
mongoose.model('user', UsersSchema);
mongoose.model('wall_message', Wall_messageSchema);
mongoose.model('wall_comment', Wall_commentSchema);


