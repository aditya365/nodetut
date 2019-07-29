import * as http from "http";

const product = {
  id: 1,
  name: "Supreme T-Shirt",
  brand: "Supreme",
  options: [{ color: "blue" }, { size: "XL" }]
};

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.stringify(product));
  })
  .listen(7000);
