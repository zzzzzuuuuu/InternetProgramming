var http = require("http");
var express = require("express");

var app = express();

app.all("/a", function (request, response) {
  response.send("<h1>Page A</h1>");
});
app.all("/b", function (request, response) {
  response.send("<h1>Page B</h1>");
  next();
})
app.all("/c", function (request, response) {
  response.send("<h1>Page C</h1>");
});

http.createServer(app).listen(960805, function () {
  console.log("server running at http://127.0.0.1:960805");
});
