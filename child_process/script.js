// process.send('hello')
setTimeout(() => {
  console.log('timeout!')
  // process.stdout.write('bye')
  console.log(process.send)
  if (process.send) {
    process.send('hello')
  }
  setTimeout(() => {
    console.log('done')
  }, 2000)
}, 3000)