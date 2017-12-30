const mongoose = require('mongoose');
/* eslint-disable */

const Schema = mongoose.Schema; // eslint-disable-line

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

User.getAllUsers = () => (
  User.find({})
);

User.addUser = function() {
	let newUser = User({
		username: 'johndoe',
		password: '12345',
	});

	newUser.save(function(err) {
		if (err) throw err;
		console.log('johndoe is created!');
	});
};

module.exports = User;
