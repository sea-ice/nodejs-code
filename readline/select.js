const readline = require('readline')

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const options = ['apple', 'banana', 'pear']
const selectState = (new Array(options.length)).fill(false)
const totalLine = 1 + options.length + 1
const activeLine = 1
const startLine = 1

function printMenu() {
  let menu = ''
  for (let i = 0, len = options.length; i < len; i++) {
    let isActiveLine = activeLine === startLine + i
    menu += '[' + (isActiveLine ? '[' : '') +
      (selectState[i] ? '√' : 'x') +
      (isActiveLine ? ']' : '') + ']' +
      options[i] + '\n'
  }
  menu += '[space] select; [↑] up; [↓] down; [enter] confirm.\n'
  process.stdout.write(menu)
}
// readline.moveCursor方法传入的第二个和第三个参数分别是水平方向上和垂直方向上的偏移量，
// 以第三个参数为例，为正表示向下偏移，为负表示向上偏移
process.stdout.write('What fruits do you like?\n')
printMenu()
process.stdin.on('keypress', (chunk, key) => {
  if (key.name === 'up') {
    if (startLine === activeLine) return
    activeLine--
    readline.moveCursor(process.stdout, 0, totalLine - options.length - 1)
    printMenu()
  } else if (key.name === 'down') {
    if (startLine + options.length - 1 === activeLine) return
    activeLine++
    readline.moveCursor(process.stdout, 0, totalLine - options.length - 1)
    printMenu()
  } else if (key.name === 'space') {
    let currentIndex = activeLine - startLine;
    let oldState = selectState[currentIndex]
    selectState[currentIndex] = !oldState
    readline.moveCursor(process.stdout, 0, totalLine - options.length - 1)
    printMenu()
  } else if (key.name === 'return') {
    let selectIndex = selectState.findIndex(v => v)
    if (selectIndex.length) {
      process.stdout.write(
        'Your favorite fruits: ' + selectIndex.map(i => options[i]).join(',') + '\n')
      process.exit()
    } else {
      totalLine += 2
      activeLine = startLine = totalLine
      process.stdout.write(
        '\nYou has not selected anything, try again!\n')
      readline.moveCursor(process.stdout, 0, activeLine)
      printMenu()
      totalLine += options.length + 1
    }
  }
})