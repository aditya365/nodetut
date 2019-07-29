import * as fs from "fs";
var path = "data/users.json";
export function getUsers(req, res) {
  res.send(_getUsers());
}

function _getUsers() {
  return fs.readFileSync(path);
}
