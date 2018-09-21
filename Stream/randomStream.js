let {Readable} = require('stream')
let Chance = require('chance')
const chance = new Chance()

class RandomStream extends Readable {
	_read () {
		console.log('call _read')
		let chunk_1 = chance.string()
		let chunk_2 = chance.string()
		this.push(chunk_1)
		console.log(`push chunk 1: ${chunk_1}`)
		this.push(chunk_2)
		console.log(`push chunk 2: ${chunk_2}`)
		if (chance.bool({likehood: 5})) {
			this.push(null)
		}
	}
}

let rs = new RandomStream(), chunk
// rs.on('readable', () => {
// 	console.log('readable')
// 	while (null !== (chunk = rs.read())) {
// 		console.log(`Read data length: ${chunk.length}, ${chunk}`)
// 	}
// })
rs.on('data', chunk => {
	console.log(`chunk: ${chunk}`)
})