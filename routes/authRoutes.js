const passport = require('passport');

module.exports = (app) => {
  // Route handler for Google OAuth, awake passport
  // 'google': tells passport to use Google Strategy
  // scope: we need access for user's profile and email
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // Callback handler
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // PassportJS takes the user ID and kills the ID in this session
    req.logout();
    // Verify user is signed out
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
