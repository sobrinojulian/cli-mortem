#!/usr/bin/env node

const meow = require('meow')
const Muerte = require('./muerte')

const cli = meow(`
    Usage
      $ muerte <command>

    Commands
      sbd   Set Birth Date. FORMAT: YYYY/MM/DD
      gbd   Get Birth Date
      ndl   Number of Days Lived
      eyd   Estimated Year of Death
      edr   Estimated Days Remaining
      pro   Progress Percentage

    Examples
      $ muerte sbd 1992/07/07
      $ muerte gbd
      1992/07/07
      $ muerte ndl
      9363
      $ muerte eyd
      2062
      $ muerte edr
      16204
      $ muerte pro
      36.62%
`)

const command = cli.input[0]
switch (command) {
  case 'sbd':
    const d = cli.input[1]
    Muerte.setBirthDate(d)
      .then(console.log)
      .catch(console.error)
    break
  case 'gbd':
    Muerte.getBirthDate()
      .then(console.log)
      .catch(console.error)
    break
  case 'ndl':
    Muerte.numberOfDaysLived()
      .then(console.log)
      .catch(console.error)
    break
  case 'eyd':
    Muerte.estimatedYearOfDeath()
      .then(console.log)
      .catch(console.error)
    break
  case 'edr':
    Muerte.estimatedDaysRemaining()
      .then(console.log)
      .catch(console.error)
    break
  case 'pro':
    Muerte.progressPercentage()
      .then(console.log)
      .catch(console.error)
    break
  default:
    cli.showHelp()
}
