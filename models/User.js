const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter username"],
    },

    email: {
      type: String,
      required: [true, "please enter email"],
    },

    age: {
        type: Number
    }
  }
);

const User = mongoose.model('User', UserSchema);

module.exports= User
