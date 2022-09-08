# mortem-cli

> 💀 Death clock


## Install

```
$ npm install --global https://github.com/sobrinojulian/mortem-cli
```


## Usage

```
$ mortem --help

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
    30.19
    $ mortem 1992/07/07 ndl
    11020
    $ mortem 1992/07/07 eyd
    2067
    $ mortem 1992/07/07 edr
    16355
    $ mortem 1992/07/07 pro
    40.26
    $ mortem 1992/07/07 ypr
    68.72
```

## Tip
Add `alias m='mortem <date>'` to your .zshrc/.bashrc, to invoke mortem without
having to repeat the date.

```sh
$ alias m='mortem <date>'
$ m ndl # 9363
$ m eyd # 2062
$ m edr # 16204
$ m pro # 36.62%
```

## Related

- [joshavanier/mortem](https://gitlab.com/joshavanier/mortem) - API for this module
