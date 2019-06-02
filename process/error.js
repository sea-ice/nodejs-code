process.on('uncaughtException', err => {
	console.log('caught exception')
})

setTimeout(() => {
	throw new Error('error!')
	console.log('never run')
});