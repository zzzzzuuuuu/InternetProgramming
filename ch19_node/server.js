var http = require("http");
var express = require("express");

var app = express();

app.use(function (request, response, next) {
  console.log("first");
  next();
});
app.use(function (request, response, next) {
  console.log("second");
  next();
});
app.use(function (request, response, next) {
  response.send("<h1>하이</h1>");
});

http.createServer(app).listen(1105, function () {
  console.log("server running http://127.0.0.1:1105");
});
