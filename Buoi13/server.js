const http = require("http");

const hostname = "127.0.0.1";
const port = 3001;
const load = require("./baitap");
const data = require("./data.json");

const server = http.createServer((req, res) => {
  const path = "index";

  if (data) {
    load.index(req, res, path, data);
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
