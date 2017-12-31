const mongoose = require('mongoose');

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

User.login = username => (
  User.findOne({ username }).exec()
    .then(user => user)
    .catch(err => err)
);


User.signup = (username, password, cb) => {
  const newUser = User({
    username,
    password,
  });

  newUser.save((err, success) => {
    if (err) {
      console.log('error is', err);
      cb(err);
    } else {
      console.log('newUser save: ', success);
      cb(null, success);
    }
  });
};

module.exports = User;
