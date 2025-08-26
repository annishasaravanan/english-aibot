const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  ipa: {
    type: String,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Academic', 'Business', 'Literature', 'Science', 'General'],
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Word', WordSchema);