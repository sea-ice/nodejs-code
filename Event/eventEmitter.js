let EventEmitter = require('events')
let utils = require('util')

// console.log(utils)

function MyEventEmitter() {}
utils.inherits(MyEventEmitter, EventEmitter)
MyEventEmitter.prototype.fire = function fire() {
	console.log('Before emit')
	this.emit('fire')
	console.log('After emit')
}

let emitter = new MyEventEmitter()
emitter.on('fire', () => {
	console.log('Fire event')
})
emitter.fire()