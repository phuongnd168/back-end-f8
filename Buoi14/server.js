const http = require("http");
const hostname = "127.0.0.1";
const port = 3001;
const home = require("./index");
let url = require("url");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const path = req.url;

  if (path === "/") {
    home.index(req, res, "index");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
