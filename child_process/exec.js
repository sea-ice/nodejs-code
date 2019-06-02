const {exec} = require('child_process')

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) { console.log(err); return }
  console.log('output: ' + stdout)
})