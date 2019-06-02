const readline = require('readline')

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface.question('Are you OK?\n', answer => {
  console.log(`Your answer: ${answer}`)
  interface.close()
})