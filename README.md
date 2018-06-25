# choo-scaffold
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Scaffold out files for a [Choo](https://choo.io) project. Useful to speed up
creating applications. 

## Usage
```sh
$ npx choo-scaffold <command>
```

## API
```txt
  $ choo-scaffold <command> [options]

  Commands:

    store       generate a new store
    view        generate a new view
    component   generate a new component

  Options:

    -h, --help        print usage
    -v, --version     print version
    -q, --quiet       don't output any logs

  Examples:

    Create a new store
    $ choo-scaffold store todos

    Create a new view
    $ choo-scaffold view 404

    Create a new component
    $ choo-scaffold component button

  Running into trouble? Feel free to file an issue:
  https://github.com/choojs/choo-scaffold/issues/new

  Do you enjoy using this software? Become a backer:
  https://opencollective.com/choo
```

## See Also

- [create-choo-app](https://github.com/choojs/create-choo-app) - create choo apps from scratch
- [create-choo-electron](https://github.com/choojs/create-choo-electron) - create choo electron apps from scratch
- [choo-cli](https://github.com/trainyard/choo-cli) - creates choo apps from templates on github

## License
[Apache-2.0](./LICENSE)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/choo-scaffold.svg?style=flat-square
[3]: https://npmjs.org/package/choo-scaffold
[4]: https://img.shields.io/travis/choojs/choo-scaffold/master.svg?style=flat-square
[5]: https://travis-ci.org/choojs/choo-scaffold
[6]: https://img.shields.io/codecov/c/github/choojs/choo-scaffold/master.svg?style=flat-square
[7]: https://codecov.io/github/choojs/choo-scaffold
[8]: http://img.shields.io/npm/dm/choo-scaffold.svg?style=flat-square
[9]: https://npmjs.org/package/choo-scaffold
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
