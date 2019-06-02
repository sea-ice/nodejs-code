new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(new Promise(function (resolve, reject) {
      resolve('done!')
    }))
  }, 100)
}).then(val => {
  console.log(val)
})