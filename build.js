const path = require('path')
const browserify = require('browserify')

const b = browserify('./src/main.js', {
  paths: [
    path.join(__dirname, '/src')
  ],
  insertGlobalVars: {
    THREE: (file, dir) => `require('three')`
  }
})

b.bundle().pipe(process.stdout)
