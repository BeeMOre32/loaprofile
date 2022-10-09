const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/Profile',
        createProxyMiddleware({
            target: 'https://lostark.game.onstove.com/',
            changeOrigin: true,
        })
    );
};