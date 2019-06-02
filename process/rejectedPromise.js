Promise.reject('rejected')

console.log('never run')

setTimeout(() => {
	console.log('time out')
}, 1000);