var dedent = require('dedent')
var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')

exports.store = function (filename, cb) {
  var file = dedent`
    module.exports = store

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

function write (filename, file, cb) {
  fs.writeFile(filename, file, function (err) {
    if (err) return cb(new Error('Could not write file ' + filename))
    cb()
  })
}
