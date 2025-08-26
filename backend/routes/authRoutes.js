const express = require('express');
const passport = require('passport');
const {
  register,
  login,
  socialAuthSuccess,
  guestAccess,
  forgotPassword,
  resetPassword,
  getCurrentUser
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Regular authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/guest', guestAccess);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/auth-error` }),
  socialAuthSuccess
);

// LinkedIn OAuth routes
router.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] })
);

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: `${process.env.FRONTEND_URL}/auth-error` }),
  socialAuthSuccess
);

// Social auth endpoint for frontend (to handle the redirect)
router.post('/social-auth', (req, res) => {
  const { provider } = req.body;
  
  if (provider === 'google') {
    return res.redirect('/api/auth/google');
  } else if (provider === 'linkedin') {
    return res.redirect('/api/auth/linkedin');
  }
  
  res.status(400).json({
    success: false,
    message: 'Invalid provider'
  });
});

module.exports = router;