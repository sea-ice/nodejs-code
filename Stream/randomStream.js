let {Readable} = require('stream')
let Chance = require('chance')
const chance = new Chance()

class RandomStream extends Readable {
	_read () {
		let chunk = chance.string()
		this.push(chunk)
		console.log(`Length: ${this._readableState.length}`)
		// if (chance.bool({likehood: 1})) {
		// 	console.log('to end')
		// 	this.push(null)
		// }
	}
}

let rs = new RandomStream(), chunk
rs.on('readable', function () {
	console.log('readable start')
	chunk = this.read()
	console.log(`read chunk: ${chunk}`)
})
// rs.on('data', chunk => {
// 	console.log(`chunk: ${chunk}`)
// })