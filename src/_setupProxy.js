const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/tmdb",
    createProxyMiddleware({
      target: "https://api.themoviedb.org/3",
      changeOrigin: true,
      pathRewrite: {
        "^/tmdb": "", // /tmdb/trending/... → /trending/...
      },
    })
  );
};
