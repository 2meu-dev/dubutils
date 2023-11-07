const fs = require("fs");
const path = require("path");

function getAllFilesInDir(dir) {
  let files = [];

  const filesInDir = fs.readdirSync(dir);

  filesInDir.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a directory, recursively call the function
      files = files.concat(getAllFilesInDir(filePath));
    } else {
      // If it's a file, add it to the list
      files.push(filePath);
    }
  });

  return files;
}

const filterFiles = (path) => {};

const PARSABLE_PLATFORMS = ["2dub", "solution", "class", "learning"];

exports.parseurl = function (inputOptions) {
  const { execSync } = require("child_process");
  const path = require("path");
  const findup = require("findup-sync");

  ///////////////////////////////////////////////////////////
  // options

  const options = inputOptions.parseurl();
  const { platform } = options;
  //   const platforms
  const toParse = Object.keys(platform).reduce((acc, key) => {
    if (!PARSABLE_PLATFORMS.includes(key)) {
      console.log(
        "알 수 없는 플랫폼. 지원하는 플랫폼 : " + PARSABLE_PLATFORMS.join(", ")
      );
      return acc;
    }
    if (options.platform[key]?.parse) {
      acc[key] = options.platform[key];
    }
    return acc;
  }, {});
  console.log({ toParse });

  const totalLength = Object.keys(toParse).length;
  let i = 1;
  const retval = {};

  ///////////////////////////////////////////////////////////
  // code

  for (const [key, value] of Object.entries(toParse)) {
    console.log(`[${i++}/${totalLength}] ${key} 파싱 시작`);

    const dstDir = path.join(value.path, "pages");
    const urls = getAllFilesInDir(dstDir)
      .filter((file) =>
        value.excludes.reduce(
          (acc, exclude) => acc && !file.includes(exclude),
          true
        )
      )
      .filter(
        (file) =>
          file.endsWith("ts") ||
          file.endsWith("tsx" || file.endsWith("js") || file.endsWith("jsx"))
      )
      .filter((file) => !path.basename(file).startsWith("."))
      .filter((file) => !path.basename(file).startsWith("_"))
      .filter((file) => !path.basename(file).startsWith("[["))
      .filter((file) => !path.basename(file).startsWith("["))
      .filter(
        (file) =>
          !path
            .dirname(file)
            .split("/")
            .some((dir) => dir.startsWith("["))
      )
      .map((file) => path.relative(dstDir, file))
      .map((file) => file.replace(/\.(ts|tsx|js|jsx)$/, ""))
      .map((file) =>
        file.endsWith("index") ? file.replace("index", "") : file
      );
    const localesIncluded = [];
    if (!value.locales.includes("")) {
      value.locales.push("");
    }
    urls.forEach((url) => {
      value.locales.forEach((locale) => {
        localesIncluded.push(new URL(`${locale}/${url}`, value.url).href);
      });
    });
    retval[key] = localesIncluded;
    console.log({ dstDir, localesIncluded });
  }

  const f = JSON.stringify(retval, null, 2);
  fs.writeFileSync(options.outPath, f, "utf8");
  console.log("File written to " + options.outPath);
};
