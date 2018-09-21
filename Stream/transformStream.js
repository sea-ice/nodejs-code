let {Readable, Transform} = require('stream')

class CustomReadable extends Readable {
	_read () {
		this.push('a')
		this.push('b')
		this.push('c')
		this.push(null)
	}
}

class CustomTransform extends Transform {
	_transform (chunk, encoding, next) {
		console.log(chunk.toString().toUpperCase())
		next()
	}
}

let rs = new CustomReadable()
let ts = new CustomTransform()
rs.pipe(ts)
