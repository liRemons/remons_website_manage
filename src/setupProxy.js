const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:3009",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
  // app.use
};
