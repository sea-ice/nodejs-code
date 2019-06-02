require('es6-promise').polyfill()
require('isomorphic-fetch')

fetch('http://localhost:3000/test', {
  method: 'POST'
}).then(response => {
  console.log(response.status)
})