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
