const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
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

// app.use: add middleware
app.use(
    cookieSession({
        // 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// require() returns a function that takes in app object and attach to the app in the file
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'Production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Heroku injects an environment
const PORT = process.env.PORT || 5000; // default: 5000
// Express is telling Node to listen on port 5000
app.listen(PORT);
