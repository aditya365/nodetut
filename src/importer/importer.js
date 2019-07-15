import fs from "fs";
import { CsvToJson } from "../utils";

export class Importer {
  constructor(dirwatcher) {
    this.dirwatcher = dirwatcher;
    this.path = "./data";

    this.dirwatcher.watch(this.path, 1000);
    this.dirwatcher.on("changed", async filename => {
      // Asynchronous
      let asyncCsvData = await this.import(`${this.path}/${filename}`);
      console.log(CsvToJson(asyncCsvData));

      //Synchronous
      let csvData = this.importSync(`${this.path}/${filename}`);
      console.log(CsvToJson(csvData));
    });
  }

  //Asynchronous
  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf-8", (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      });
    });
  }

  //Synchronous
  importSync(path) {
    let data = fs.readFileSync(path, { encoding: "utf-8" });
    return data;
  }
}
