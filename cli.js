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
      $ mortem edr
      16204
      $ mortem eyd
      2062
`)

const command = cli.input[0]
switch (command) {
  case 'sbd':
    const date = cli.input[1]
    Mortem.setBirthDate(date)
      .then(console.log)
      .catch(console.error)
    break
  case 'gbd':
    Mortem.getBirthDate()
      .then(console.log)
      .catch(console.error)
    break
  case 'ndl':
    Mortem.numberOfDaysLived()
      .then(console.log)
      .catch(console.error)
    break
  case 'pro':
    Mortem.progressPercentage()
      .then(console.log)
      .catch(console.error)
    break
  case 'edr':
    Mortem.estimatedDaysRemaining()
      .then(console.log)
      .catch(console.error)
    break
  case 'eyd':
    Mortem.estimatedYearOfDeath()
      .then(console.log)
      .catch(console.error)
    break
  default:
    cli.showHelp()
}
