const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy (only if credentials are provided)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        // User exists, update last login
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Check if user exists with same email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Link Google account to existing user
        user.googleId = profile.id;
        user.avatar = profile.photos[0]?.value || user.avatar;
        user.isEmailVerified = true;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Create new user
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0]?.value || '',
        isEmailVerified: true,
        lastLogin: new Date()
      });

      await user.save();
      done(null, user);

    } catch (error) {
      console.error('Google OAuth error:', error);
      done(error, null);
    }
  }));
} else {
  console.warn('Google OAuth credentials not provided. Google authentication will be disabled.');
}

// LinkedIn OAuth Strategy (only if credentials are provided)
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this LinkedIn ID
      let user = await User.findOne({ linkedinId: profile.id });
      
      if (user) {
        // User exists, update last login
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Check if user exists with same email
      const email = profile.emails[0]?.value;
      if (email) {
        user = await User.findOne({ email });
        
        if (user) {
          // Link LinkedIn account to existing user
          user.linkedinId = profile.id;
          user.avatar = profile.photos[0]?.value || user.avatar;
          user.isEmailVerified = true;
          user.lastLogin = new Date();
          await user.save();
          return done(null, user);
        }
      }

      // Create new user
      user = new User({
        linkedinId: profile.id,
        name: profile.displayName,
        email: email || `linkedin_${profile.id}@temp.com`,
        avatar: profile.photos[0]?.value || '',
        isEmailVerified: !!email,
        lastLogin: new Date()
      });

      await user.save();
      done(null, user);

    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      done(error, null);
    }
  }));
} else {
  console.warn('LinkedIn OAuth credentials not provided. LinkedIn authentication will be disabled.');
}

module.exports = passport;