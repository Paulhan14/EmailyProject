const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// Create user collection
require('./models/User');
// after login, retreive user object or construct one
require('./services/passport');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(keys.mongoURI);
// Webapp
const app = express();

app.use(
    cookieSession({
        // 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// require() returns a function that takes in app object and attach to the app in the file
require('./routes/authRoutes')(app);

// Heroku injects an environment
const PORT = process.env.PORT || 5000; // default: 5000
// Express is telling Node to listen on port 5000
app.listen(PORT);
