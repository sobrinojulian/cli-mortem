#!/usr/bin/env node

const meow = require('meow')
const Conf = require('conf')
const moment = require('moment')
const mortem = require('./mortem')

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

const exit = (error, status) => {
  console.error(error)
  process.exit(status)
}
const sbd = (date, config) => {
  if (moment(date, 'YYYY/MM/DD', true).isValid()) {
    config.set('date', date)
  } else {
    exit('Invalid date', 1)
  }
}


const config = new Conf()
const command = cli.input[0]

//config.delete('date')
const error = !config.has('date') && command !== 'sbd'
if (error) exit('Date is unset', 1)

const date = new Date(config.get('date'))
switch (command) {
  case 'sbd':
    const newDate = cli.input[1]
    sbd(newDate, config)
    break
  case 'gbd':
    console.log(moment(date).format('YYYY/MM/DD'))
    break
  case 'ndl':
    console.log(mortem.ndl(date))
    break
  case 'pro':
    console.log(mortem.pro(date).toFixed(2) + '%')
    break
  case 'etr':
    console.log(mortem.etr(date))
    break
  case 'eyd':
    console.log(mortem.eyd(date))
    break
  default:
    cli.showHelp()
}
