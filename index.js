var dedent = require('dedent')
var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')

exports.store = function (filename, cb) {
  var name = path.parse(filename).name
  var file = dedent`
    module.exports = store

    store.storeName = '${name}'
    function store (state, emitter) {
      emitter.on('DOMContentLoaded', function () {
      })
    }
  `
  var dir = path.dirname(filename)
  mkdirp(dir, function (err) {
    if (err) return cb(err)
    write(filename, file, cb)
  })
}

exports.view = function (filename, cb) {
  var file = dedent`
    var html = require('choo/html')

    module.exports = view

    function view (state, emit) {
      return html\`
        <body>
        </body>
      \`
    }
  `
  var dir = path.dirname(filename)
  mkdirp(dir, function (err) {
    if (err) return cb(err)
    write(filename, file, cb)
  })
}

exports.component = function (filename, cb) {
  var name = path
              .parse(filename).name
              .split('-')
              .map(word => word[0].toUpperCase() + word.slice(1))
              .join('')

  var file = dedent`
    var Component = require('choo/component')
    var html = require('choo/html')

    class ${name} extends Component {
      constructor (id, state, emit) {
        super(id)
        this.local = state.components[id] = {}
      }

      createElement () {
        return html\`
          <div>
          </div>
        \`
      }

      update () {
        return true
      }
    }

    module.exports = ${name}
  `
  var dir = path.dirname(filename)
  mkdirp(dir, function (err) {
    if (err) return cb(err)
    write(filename, file, cb)
  })
}

function write (filename, file, cb) {
  fs.writeFile(filename, file, function (err) {
    if (err) return cb(new Error('Could not write file ' + filename))
    cb()
  })
}
