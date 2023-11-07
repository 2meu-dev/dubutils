#!/usr/bin/env node
const { OptionBuilder } = require("./optionbuilder.js");
const inputArgs = process.argv.slice(2).map((arg) => arg.toLowerCase());

const command = inputArgs.at(0);

// if (inputArgs.at(0) === "help") {
//   const options = new OptionBuilder(inputArgs);
//   const {help} = require("./help.js");
//   help(options);
// }

const options = new OptionBuilder(inputArgs.slice(1));

const { help } = require("./help.js");

switch (command) {
  case "buildenv":
    const { buildenv } = require("./buildenv.js");
    buildenv(options);
    break;
  case "parseurl":
    const { parseurl } = require("./parseurl.js");
    parseurl(options);
    break;
  case "copystring":
    const { copystring } = require("./copystring.js");
    copystring(options);
    break;
  case "help":
    help(options);
    break;
  default:
    console.log(
      `비어있거나 지원하지 않는 커맨드입니다. 입력한 커맨드 : [${inputArgs.join(
        ", "
      )}]`
    );
    help(options);
}
