#!/usr/bin/env node

const meow = require('meow')
const Mortem = require('./mortem')

const cli = meow(`
    Usage
      $ mortem <command>

    Commands
      sbd   Set Birth Date. FORMAT: YYYY/MM/DD
      gbd   Get Birth Date
      ndl   Number of Days Lived
      pro   Progress Percentage
      etr   Estimated Time Remaining
      eyd   Estimated Date of Death

    Examples
      $ mortem sbd 1992/07/07
      $ mortem gbd
      1992/07/07
      $ mortem ndl
      9363
      $ mortem pro
      36.62%
      $ mortem etr
      16204
      $ mortem eyd
      2062
`)

const command = cli.input[0]
switch (command) {
  case 'sbd':
    const date = cli.input[1]
    Mortem.sbd(date)
      .then(console.log)
      .catch(console.error)
    break
  case 'gbd':
    Mortem.gbd()
      .then(console.log)
      .catch(console.error)
    break
  case 'ndl':
    Mortem.ndl()
      .then(console.log)
      .catch(console.error)
    break
  case 'pro':
    Mortem.pro()
      .then(console.log)
      .catch(console.error)
    break
  case 'etr':
    Mortem.etr()
      .then(console.log)
      .catch(console.error)
    break
  case 'eyd':
    Mortem.eyd()
      .then(console.log)
      .catch(console.error)
    break
  default:
    cli.showHelp()
}
