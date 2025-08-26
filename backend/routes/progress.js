const express = require('express');
const router = express.Router();
const UserWord = require('../models/UserWord');
const auth = require('../middleware/auth');

// Update word status
router.post('/', auth, async (req, res) => {
  const { wordId, status } = req.body;
  try {
    let userWord = await UserWord.findOne({ user: req.user.id, word: wordId });
    if (userWord) {
      userWord.status = status;
      userWord.lastSeenAt = Date.now();
      await userWord.save();
    } else {
      userWord = new UserWord({
        user: req.user.id,
        word: wordId,
        status,
      });
      await userWord.save();
    }
    res.json(userWord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;