setTimeout(() => {
  console.log('setTimeout') 
}, 0)
setImmediate(() => {
  console.log('setImmediate') 
})

let start = Date.now()
while (Date.now() - start < 10);