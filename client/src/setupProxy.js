const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  // Proxy for request to '/api' and '/auth/google'
  // Redirect to localhost
  app.use(
    ['/api/*', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
