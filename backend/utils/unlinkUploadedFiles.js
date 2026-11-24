const fs = require("fs");
const path = require("path");
const ErrorHandler = require("./ErrorHandler");

const uploadsDirectory = path.resolve(__dirname, "../uploads");

const unlinkUploadedFiles = (filenames = []) =>
  Promise.all(
    filenames.map((filename) => {
      if (
        typeof filename !== "string" ||
        path.basename(filename) !== filename
      ) {
        throw new ErrorHandler("Invalid uploaded file path", 400);
      }

      const filePath = path.join(uploadsDirectory, filename);

      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (error) => {
          if (error && error.code !== "ENOENT") {
            reject(error);
            return;
          }
          resolve();
        });
      });
    })
  );

module.exports = unlinkUploadedFiles;
