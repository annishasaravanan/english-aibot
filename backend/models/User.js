const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  dailyGoal: {
    type: Number,
    default: 20,
  },
  completedToday: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);