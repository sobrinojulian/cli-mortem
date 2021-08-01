#!/usr/bin/env node

const meow = require("meow");
const Mortem = require("./mortem");

const cli = meow(`
    Usage
      $ mortem <date> <command>

    <date>  Birth date. FORMAT: YYYY/MM/DD
    
    <command>
      ndl   Number of Days Lived
      eyd   Estimated Year of Death
      edr   Estimated Days Remaining
      pro   Progress Percentage

    Examples
      $ mortem 1992/07/07 ndl
      9363
      $ mortem 1992/07/07 eyd
      2062
      $ mortem 1992/07/07 edr
      16204
      $ mortem 1992/07/07 pro
      36.62%
`);

const re =
  /^(-?(?:[1-9][0-9]*)?[0-9]{4})\/(1[0-2]|0[1-9])\/(3[01]|0[1-9]|[12][0-9])$/;
const isDate = re.test(cli.input[0]);

// undefined means no command given, same as cli.inpute.length == 1
const isCommand = ["ndl", "eyd", "edr", "pro", undefined].includes(
  cli.input[1]
);

if (isDate && isCommand) {
  const birth = new Date(cli.input[0]);
  const command = cli.input[1];
  const m = new Mortem(birth);
  switch (command) {
    case undefined:
      console.log(
        [
          `ndl: ${m.ndl()}`,
          `eyd: ${m.eyd()}`,
          `edr: ${m.edr()}`,
          `pro: ${m.pro().toFixed(2)}%`,
        ].join("\n")
      );
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
      console.log(`${m.pro().toFixed(2)}%`);
      break;
  }
} else {
  console.error("Invalid command");
}
