const mongoose = require('mongoose');

const UserWordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true,
  },
  status: {
    type: String,
    enum: ['learned', 'review'],
    default: 'review',
  },
  lastSeenAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserWord', UserWordSchema);