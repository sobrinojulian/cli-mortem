#!/usr/bin/env node

const meow = require("meow");
const Mortem = require("./mortem");

const cli = meow(`
    Usage
      $ mortem <date> <command>

    <date>  Birth date. FORMAT: YYYY/MM/DD
    
    <command>
      all   Summary. DEFAULT
      age   Age in Years
      ndl   Number of Days Lived
      eyd   Estimated Year of Death
      edr   Estimated Days Remaining
      pro   Life Progress Percentage
      ypr   Year Progress Percentage

    Examples
      $ mortem 1992/07/07 age
      30.1
      $ mortem 1992/07/07 ndl
      9363
      $ mortem 1992/07/07 eyd
      2062
      $ mortem 1992/07/07 edr
      16204
      $ mortem 1992/07/07 pro
      36.62%
`);

// Validate first parameter
const re =
  /^(-?(?:[1-9][0-9]*)?[0-9]{4})\/(1[0-2]|0[1-9])\/(3[01]|0[1-9]|[12][0-9])$/;
const isDate = re.test(cli.input[0]);

// Validate second parameter
const empty = undefined
const validCommands = [empty, "all", "age", "ndl", "eyd", "edr", "pro", "ypr"]
const isCommand = validCommands.includes(cli.input[1]);

if (isDate && isCommand) {
  const birth = new Date(cli.input[0]);
  const command = cli.input[1];
  const m = new Mortem(birth);
  switch (command) {
    case undefined:
      console.log(m.all());
      break;
    case "all":
      console.log(m.all());
      break;
    case "age":
      console.log(m.age());
      break;
    case "ndl":
      console.log(m.ndl());
      break;
    case "eyd":
      console.log(m.eyd());
      break;
    case "edr":
      console.log(m.edr());
      break;
    case "pro":
      console.log(m.pro());
      break;
    case "ypr":
      console.log(m.ypr());
      break;
  }
} else {
  console.error("Invalid command\n$ mortem --help");
}
