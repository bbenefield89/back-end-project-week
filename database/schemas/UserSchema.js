const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // email: { type: String, required: true, unique: true }
});

User.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err)
      return next(err);
    
    this.password = hash;
    next();
  });
});

module.exports = User;