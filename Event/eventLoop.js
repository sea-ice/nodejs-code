process.nextTick(() => {
	setTimeout(() => {
		console.log('setTimeout')
	}, 0)
	process.nextTick(() => {
		console.log('nextTick 2')
		process.nextTick(() =>　{
			console.log('nextTick 4')
		});
		console.log('nextTick 3')
	});
	setImmediate(() => {
		console.log('setImmediate 2')
	});
	console.log('nextTick 1')
});

setImmediate(() => {
	console.log('setImmediate 1')
	process.nextTick(() => {
		console.log('nextTick in setImmediate 1')
	})
});