// require(): common js modules import mathod
const express = require('express');
// app: running express app
// used for setting up listening port and http request handling
const app = express(); 

// app.get: new route handler for HTTP GET request
// '/': a specific route
// @req: request object
// @res: response object
// when app receives a GET request through route '/', the function gets called
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// Heroku injects an environment
const PORT = process.env.PORT || 5000 // default: 5000
// Express is telling Node to listen on port 5000
app.listen(PORT);