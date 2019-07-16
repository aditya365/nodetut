import * as yargs from "yargs";
import * as fs from "fs";
import { CsvToJson } from "./csvtojson-converter";
import * as path from "path";
import * as https from "https";
import { success, error, info } from "./log";

//makes action as mandatory parameter
let argv = yargs
  .usage("Usage: $0 -action [str]")
  .demandOption(["action"])
  .alias("p", "path").argv;

// Validate the required arguments
if (
  ["outputFile", "convertFromFile", "convertToFile"].indexOf(argv.action) >
    -1 &&
  !argv.file
) {
  info("Specify file path using --file argument");
  process.exit();
}

//check the action and call relavant action method
switch (argv.action) {
  case "reverse": {
    process.stdin.on("readable", () => {
      reverse(process.stdin.read());
    });
    break;
  }
  case "transform": {
    process.stdin.on("readable", () => {
      transform(process.stdin.read().toString());
    });
    break;
  }
  case "outputFile": {
    outputFile(argv.file);
    break;
  }
  case "convertFromFile": {
    convertFromFile(argv.file);
    break;
  }
  case "convertToFile": {
    convertToFile(argv.file);
    break;
  }
  case "cssBundler": {
    if (!argv.path) {
      info("Specify directory path for CSS files using --path");
      process.exit();
    }
    cssBundler(argv.path);
    break;
  }
}

//reverses string
function reverse(str) {
  process.stdout.write(str.reverse());
}

//converts string to uppercase
function transform(str) {
  process.stdout.write(str.toUpperCase());
}

//outputs a given file to stdout
function outputFile(filePath) {
  let readStream = fs.createReadStream(filePath);
  readStream
    .on("open", function() {
      readStream.pipe(process.stdout);
    })
    .on("error", function(e) {
      error(e);
    })
    .on("close", function() {
      success("Succesfully output the file!");
    });
}

//converts a given csv file to json and prints to stdout
function convertFromFile(filePath) {
  let readStream = fs.createReadStream(filePath);
  readStream
    .on("data", async function(chunk) {
      await process.stdout.write(JSON.stringify(CsvToJson(chunk.toString())));
    })
    .on("error", function(e) {
      error(e);
    })
    .on("close", function() {
      success(`succesfully converted ${filePath}`);
    });
}

//converts a given csv file and writes to json file
function convertToFile(filePath) {
  let jsonFile = `${path.dirname(filePath)}/${path.basename(
    filePath,
    path.extname(filePath)
  )}.json`;
  let readStream = fs.createReadStream(filePath);
  let writeStream = fs.createWriteStream(jsonFile);
  readStream
    .on("data", async function(chunk) {
      writeStream.write(JSON.stringify(CsvToJson(chunk.toString())));
    })
    .on("error", function(e) {
      error(e);
    })
    .on("close", function() {
      success(`Succesfully converted ${filePath} to ${jsonFile}`);
    });
}

//bubdles all CSS files in a given directory
function cssBundler(dirPath) {
  if (!dirPath || dirPath == true) {
    return error("invalid file path");
  }
  var writeStream = fs.createWriteStream(`${dirPath}/bundle.css`);
  fs.readdir(dirPath, (err, files) => {
    files.forEach(file => {
      if (path.extname(file) === ".css") {
        fs.createReadStream(`${dirPath}/${file}`).pipe(writeStream);
      }
    });
  });
  getFromRemoteSource(dirPath);
}

//Appends CSS from external source to bundle.css
function getFromRemoteSource(dirPath) {
  let writeStream = fs.createWriteStream(`${dirPath}/bundle.css`, {
    flags: "a"
  });
  https.get(
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    res => {
      res.pipe(writeStream);
      success("Succesfully bundled all CSS files!");
    }
  );
}
