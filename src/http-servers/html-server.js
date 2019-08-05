import * as http from "http";
import * as fs from "fs";

let message = "Welcome";
http
  .createServer(function(req, res) {
    let htmlContent = fs.readFileSync("src/http-servers/index.html").toString();
    res.writeHead(200, "text/html");
    res.write(htmlContent.replace("{message}", message));
    res.end();
  })
  .listen(7000);
