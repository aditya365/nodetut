import * as http from "http";

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    req.pipe(res);
  })
  .listen(7000);
