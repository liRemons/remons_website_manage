const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:3009",
      // target: "http://8.136.206.131:3009",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/mark',{
      target:"https://remons.gitee.io",
      pathRewrite:{
        "^/mark": "",
      },
      changeOrigin:true
    })
  )
};
