const http = require("http");
const fs = require('fs').promises;

const host = "localhost";
const port = +process.env.PORT || 8076;

const requestListener = function (req, res) {
  try {
    fs.readFile(__dirname + "/public/index.html")
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      })
      .catch(err => {
        res.writeHead(500);
        res.end(err.message);
        return;
      });
  } catch (err) {
    res.writeHead(500);
    res.end(err.message);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

console.log(host, port);
