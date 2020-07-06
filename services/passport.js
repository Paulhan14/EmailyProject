const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id: document id from MongoDB
  // ID is saved to current session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// Use the google strategy
// clientID: identification
// clientSecret: grant permission
// callback url: redirect url after user grant access
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    // access token: used to access user account
    async (accessToken, refreshToken, profile, done) => {
      // Search database for user with the google id
      // Asynchronous
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
