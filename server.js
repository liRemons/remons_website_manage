
const express = require("express");
const path = require("path");
const app = express();
app.use("/favicon.ico", express.static(path.resolve(__dirname, "./build/favicon.ico")));
app.use("/build", express.static(path.resolve(__dirname, "./build")));
app.use("/manage_static", express.static(path.join(__dirname, "./build/manage_static")));
app.get("*", (req, res) => {
  // var deviceAgent = req.headers["user-agent"].toLowerCase();
  // var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  // if (agentID) {
  //   res.sendFile(path.resolve(__dirname, "./dist") + "/mindex.html");
  // } else {
    res.sendFile(path.resolve(__dirname, "./build") + "/manage.html");
  // }
});

app.listen(8008);