#!/usr/bin/env node

var ansi = require('ansi-escape-sequences')
var inquirer = require('inquirer')
var minimist = require('minimist')
var path = require('path')
var fs = require('fs')

var lib = require('./')

var USAGE = `
  $ ${clr('choo-scaffold', 'bold')} ${clr('<command>', 'green')} [options]

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
    ${clr('$ choo-scaffold store todos', 'cyan')}

    Create a new view
    ${clr('$ choo-scaffold view 404', 'cyan')}

    Create a new component
    ${clr('$ choo-scaffold component button', 'cyan')}

  Running into trouble? Feel free to file an issue:
  ${clr('https://github.com/choojs/choo-scaffold/issues/new', 'cyan')}

  Do you enjoy using this software? Become a backer:
  ${clr('https://opencollective.com/choo', 'cyan')}
`.replace(/\n$/, '').replace(/^\n/, '')

var NODIR = `
  Please specify a valid command:
    ${clr('$ choo-scaffold', 'cyan')} ${clr('<command>', 'green')}

  For example:
    ${clr('$ choo-scaffold store', 'cyan')} ${clr('todos', 'green')}

  Run ${clr('choo-scaffold --help', 'cyan')} to see all options.
`.replace(/\n$/, '').replace(/^\n/, '')

var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    quiet: 'q',
    version: 'v'
  },
  boolean: [
    'help',
    'quiet',
    'version'
  ]
})

;(function main (argv) {
  var cmd = argv._[0]
  var arg = argv._[1]

  if (argv.help) {
    console.log(USAGE)
  } else if (argv.version) {
    console.log(require('./package.json').version)
  } else if (cmd === 'store') {
    createStore(arg)
  } else if (cmd === 'view') {
    createView(arg)
  } else if (cmd === 'component') {
    createComponent(arg)
  } else if (!cmd) {
    select(function (cmd) {
      if (cmd === 'store') {
        createStore()
      } else if (cmd === 'view') {
        createView()
      } else if (cmd === 'component') {
        createComponent()
      } else {
        console.log(NODIR)
        process.exit(1)
      }
    })
  } else {
    console.log(NODIR)
    process.exit(1)
  }
})(argv)

function select (done) {
  inquirer.prompt([{
    type: 'list',
    name: 'input',
    message: 'Choose a scaffold type:',
    choices: [
      'store',
      'view',
      'component'
    ]
  }]).then(function (answers) {
    var answer = answers.input
    done(answer)
  })
}

function createStore (name) {
  if (name) {
    create(name)
  } else {
    inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: "What's the store's name?",
      validate: (answer) => answer.length >= 1
    }]).then(function (answers) {
      var answer = answers.input
      create(answer)
    })
  }

  function create (answer) {
    var filename = path.join(process.cwd(), 'stores', answer + '.js')
    write(filename, lib.store)
  }
}

function createView (name) {
  if (name) {
    create(name)
  } else {
    inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: "What's the view's name?",
      validate: (answer) => answer.length >= 1
    }]).then(function (answers) {
      var answer = answers.input
      create(answer)
    })
  }

  function create (answer) {
    var filename = path.join(process.cwd(), 'views', answer + '.js')
    write(filename, lib.view)
  }
}

function createComponent (name) {
  if (name) {
    create(name)
  } else {
    inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: "What's the component's name?",
      validate: (answer) => answer.length >= 1
    }]).then(function (answers) {
      var answer = answers.input
      create(answer)
    })
  }

  function create (answer) {
    var filename = path.join(process.cwd(), 'components', answer + '.js')
    write(filename, lib.component)
  }
}

function write (filename, writer) {
  fs.access(filename, function (err) {
    var relative = path.relative(process.cwd(), filename)
    if (!err) {
      console.log(clr(`The file ${relative} already exists.`, 'red'))
      process.exit(1)
    }
    writer(filename, function (err) {
      if (err) {
        console.log(clr('Aborting. The following error occured:', 'red'))
        console.log('  ' + clr(err.message, 'red') + '\n')
        process.exit(1)
      } else {
        console.log(`${clr('Created', 'magenta')} ${relative}`)
      }
    })
  })
}

function clr (text, color) {
  return process.stdout.isTTY ? ansi.format(text, color) : text
}
