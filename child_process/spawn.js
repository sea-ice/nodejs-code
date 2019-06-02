const {spawn} = require('child_process')

// const child = spawn('ls', ['-l'])
// child.stdout.on('data', chunk => console.log(chunk))


const child = spawn('node script.js', {
  stdio: 'ignore',
  shell: true,
  detached: true
})
console.log(child.stdin)
process.on('exit', () => { console.log('parent process exit!') })
child.on('message', msg => console.log(msg))
child.on('exit', () => console.log('child process exit'))
// child.unref()
// process.exit()
