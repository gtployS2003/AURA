import path from "path";
import fs from "fs";
import { rejects } from "assert";

const publicDirectory = path.join(__dirname, "../myprojact/client/public/images");
const baseUrl = "http://localhost:8080/public/images";
console.log(publicDirectory);
function getImageUrls(directory, baseUrl) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      rejects(err);
      return;
    }

    const imageUrls = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file) => path.join(baseUrl, file));

    return imageUrls;
  });
}
// getImageUrls(publicDirectory, baseUrl);
console.log(getImageUrls(publicDirectory, baseUrl));
