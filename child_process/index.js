let {fork} = require('child_process')

child = fork('./script.js')
child.on('message', msg => console.log(msg))