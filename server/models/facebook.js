// we want to create a file that has the schema for our friends

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for our friends
var UserSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	birthday: Date,
	gender: String,
	username: String,
	friend_list: Array, 
	created_at: {type: Date, default: new Date},
	updated_at: Date,
	wall_messages: [{type: Schema.Types.ObjectId, ref: 'wall_message'}],
	profile_pic: String,
	photos: Array, 
});

var Wall_messageSchema = new mongoose.Schema({
	message: String,
	created_by_username: String,
	created_by_fullname: String,
	created_by_profile_pic: String, 
	created_for: {type: Schema.ObjectId, ref: 'user'},
	created_for_fullname: String, 
	created_for_username: String, 
	created_at: Date, 
	updated_at: Date,
	comments: Array,
});

UserSchema.path('first_name').required(true, 'User name cannot be blank');
UserSchema.path('last_name').required(true, 'User name cannot be blank');
UserSchema.path('email').required(true, 'User email cannot be blank');
UserSchema.path('password').required(true, 'Password cannot be empty');
UserSchema.path('username').required(true, 'Password cannot be empty');

Wall_messageSchema.path('message').required(true, 'Message cannot be empty');

mongoose.model('user', UserSchema);
mongoose.model('wall_message', Wall_messageSchema);


