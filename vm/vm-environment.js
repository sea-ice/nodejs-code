let vm = require('vm')

process.env.NODE_ENV = "development"

const code = `
  console.log(process.env.NODE_ENV)
`

vm.runInThisContext(code);