import * as fs from "fs";
var path = "data/products-data.json";
export function getProducts(req, res) {
  res.send(_getProducts());
}

export function getProductById(req, res) {
  res.send(
    JSON.parse(_getProducts().toString()).find(p => p.id == req.params.id)
  );
}

export function getProductReviews(req, res) {
  res.send(
    JSON.parse(_getProducts().toString()).find(p => p.id == req.params.id)
      .reviews
  );
}

export function addProduct(req, res) {
  _addProduct(req.body);
  res.send(req.body);
}

function _getProducts() {
  return fs.readFileSync(path);
}

function _addProduct(product) {
  let products = JSON.parse(_getProducts().toString());
  products.push(product);
  fs.writeFileSync(path, JSON.stringify(products));
}
