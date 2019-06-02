let net = require('net')
let fs = require('fs')

function demultiplex (source, destinations) {
	let channel_id = null, chunk_length = null
	source.on('readable', () => {
		let chunk
		if (channel_id === null) {
			chunk = source.read(1)
			channel_id = chunk && chunk.readInt8(0)
			if (channel_id === null) return
		}
		if (chunk_length === null) {
			chunk = source.read(4)
			chunk_length = chunk && chunk.readInt32BE(0)
			if (chunk_length === null) return
		}
		chunk = source.read(chunk_length)
		if (chunk === null) return
		destinations[channel_id].write(chunk)
		channel_id = null
		chunk_length = null
	}).on('end', () => {
		destinations.forEach(dest => dest.end())
	})
}

net.createServer(socket => {
	const log_txt_ws = fs.createWriteStream('./log.txt');
	const err_txt_ws = fs.createWriteStream('./err.txt');
	demultiplex(socket, [log_txt_ws, err_txt_ws])
}).listen(3000, () => console.log("Listen on port 3000 successfully!"));

