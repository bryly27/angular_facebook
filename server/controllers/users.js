// make an immediate function that gives back an object that has methods that handle our requests and responses
// require mongoose so that we can access the model
var mongoose = require('mongoose');
var User = mongoose.model('user');
var Wall_message = mongoose.model('wall_message');
var Wall_comment = mongoose.model('wall_comment');
var crypto = require('crypto');
var path = require('path');
// var AWS = require('aws-sdk');
// AWS.config.region = 'us-west-1';
// AWS_ACCESS_KEY_ID='AKIAILCEL2NUQCLWXWCA';
// AWS_SECRET_ACCESS_KEY='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';
// var Facebook = mongoose.model('facebook');
module.exports = (function() {
	// return because we want to put an object into the variable for whatever requires this
	return {

		add_user: function(req, res) {
			console.log(req.body.password);
			var password = crypto.createHmac('sha1', 'codingdojo').update(req.body.password).digest('hex');
			req.body.password = password;
		 	console.log(password);
			var new_user = new User(req.body);
			new_user.save(function(err) {
				if(err) {
					console.log("err");
				} else {
					res.json({result: "You are now registered! Log in!"});
				};
			});
		},

		login_user: function(req, res){
			var password = crypto.createHmac('sha1', 'codingdojo').update(req.body.password).digest('hex');
			req.body.password = password;
			User.find({email: req.body.email}, function(err, results){
				if(results.length === 0){
					res.json({result: "You did not enter valid credentials"});
				}else if(results[0].password !== password){
					res.json({result: "You did not enter valid credentials"});
				}else{
					res.send(JSON.stringify(results));
				};
			});
		},

		search_friends: function(req, res){
			User.find({}, function(err, results){
				res.send(JSON.stringify(results));
			});
		},

		get_profile: function(req, res){
			// User.find({username: req.body.username}, function(err, results){
			// 	res.send(JSON.stringify(results));
			// });
			User.findOne({username: req.params.id})
				.populate('wall_messages')
				.populate('wall_comments')
				.exec(function(err, result){
					// res.render('result', {result:result})
					// res.send(JSON.stringify(results));
					res.json(result);
					// console.log('aldkfjlakdsjflkajsd', result);
			});
		},

		new_wall_message: function(req, res){
			User.findOne({_id: req.body.created_for}, function(err, result){
				var wall_message = new Wall_message(req.body);
				// wall_message.created_for = result._id;
				result.wall_messages.push(wall_message);
				wall_message.save(function(err){
					result.save(function(err){
						if(err){
							console.log('error', err);
						}else{
							res.end();
						}
					});
				});
			});	
		},

		new_wall_comment: function(req, res){
			Wall_message.findOne({_id: req.body.comment_for}, function(err, result){
				console.log('ldjfkla', req.body);
				result.comments.push(req.body);
				result.save(function(err){
					if(err){
						console.log('error', err);
					}else{
						res.end();
					}
				});
			});
		},

		add_photo: function(req, res){
			console.log('djkflsd', req.files);
			console.log(req.files.pic.path);
			User.findOne({_id: req.body.id}, function(err, result){
				result.profile_pic = req.files.pic.name;
				result.save(function(err, results){
					if(err){
						console.log('error', err);
					}else{
						console.log('result', result);
						res.json(result);
					}
				})
			})
		},

		get_news_feed: function(req, res){
			Wall_message.find({}, function(err, result){
				if(err){
					console.log('err', err);
				}else{
					res.json(result);
				}
			})
		},

		edit_profile_email: function(req, res){
			User.findOne({_id: req.body.id}, function(err, result){
				result.email = req.body.email;
				result.save(function(err, results){
					if(err){
						console.log(err);
					}else{
						console.log(results);
						res.json(results);
					}
				})
			})
		},

		edit_profile_username: function(req, res){
			User.findOne({_id: req.body.id}, function(err, result){
				result.username = req.body.username;
				result.save(function(err, results){
					if(err){
						console.log('err', err);
					}else{
						console.log(results);
						res.json(results);
					}
				})
			})
		},

		// get_buckets: function(req, res){
		// 	Bucket.find({created_by: req.params.id}, function(err, results){
		// 		if(err){
		// 			consol.log(err);
		// 		}else{
		// 			res.send(JSON.stringify(results));
		// 		}
		// 	})
		// },

		// get_info: function(req, res){
		// 	console.log(req.params.id);
		// 	Bucket.find({$or: [{created_by: req.params.id}, {tagged_user: req.params.id}]}, function(err, results){
		// 		if(err){
		// 			consol.log(err);
		// 		}else{
		// 			res.send(JSON.stringify(results));
		// 		}
		// 	})
		// },

		// update_complete: function(req, res){
		// 	console.log('server', req.body);
		// 	Bucket.update({_id: req.body._id}, {$set:{complete: req.body.complete}}, function(err, results){
		// 		if(err) {
		// 			console.log("err");
		// 		} else {
		// 			res.json({result: "success!"});
		// 		}
		// 	})
		// }
		

	}
})();


