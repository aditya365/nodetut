import fs from "fs";
import { EventEmitter } from "events";

export class DirWatcher extends EventEmitter {
  watch(path, delay) {
    let files = [];
    let latestFiles = [];
    setInterval(() => {
      latestFiles = fs.readdirSync(path);
      if (Array.isArray(files) && files.length) {
        // For addition of files
        let change = this.compare(files, latestFiles);
        if (change) {
          this.emit("changed", change);
        } else {
          //For changes in any files.
          files.forEach((file, index) => {
            if (Date.now() - fs.statSync(`${path}/${file}`).mtimeMs < delay) {
              this.emit("changed", latestFiles[index]);
            }
          });
        }
      }
      files = latestFiles;
    }, delay);
  }

  compare(filesArray, latestFilesArray) {
    let element = "";
    if (filesArray.length === latestFilesArray.length) {
      for (let i = 0; i < filesArray.length; i++) {
        if (latestFilesArray[i] !== filesArray[i]) {
          element = latestFilesArray[i];
        }
      }
    } else {
      for (
        let i = 0;
        i < Math.max(filesArray.length, latestFilesArray.length);
        i++
      ) {
        if (latestFilesArray[i] !== filesArray[i]) {
          element = filesArray[i] ? filesArray[i] : latestFilesArray[i];
        }
      }
    }
    return element;
  }
}
