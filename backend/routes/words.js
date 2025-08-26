const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// Get all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;