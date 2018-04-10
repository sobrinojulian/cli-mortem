#!/usr/bin/env node

const meow = require('meow')
const Conf = require('conf')
const moment = require('moment')
const mortem = require('./mortem')

const isValidDate = (date) => moment(date, 'YYYY/MM/DD', true).isValid()

const isDateSet = (config) => config.has('date')

const errorAndExit = (message) => {
  console.error(message)
  const failure = 1
  process.exit(failure)
}

const sbd = (date, config) => {
  if (!isValidDate(date)) return false
  config.set('date', date)
  return true
}

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

const config = new Conf()
const command = cli.input[0]
if (!isDateSet(config) && command !== 'sbd') errorAndExit('Date is unset')
const d = new Date(config.get('date'))
switch (command) {
  case 'sbd':
    const input = cli.input[1]
    if (!sbd(input, config)) errorAndExit('Invalid date')
    break
  case 'gbd':
    console.log(moment(d).format('YYYY/MM/DD'))
    break
  case 'ndl':
    console.log(mortem.ndl(d))
    break
  case 'pro':
    console.log(mortem.pro(d).toFixed(2) + '%')
    break
  case 'etr':
    console.log(mortem.etr(d))
    break
  case 'eyd':
    console.log(mortem.eyd(d))
    break
  default:
    cli.showHelp()
}
