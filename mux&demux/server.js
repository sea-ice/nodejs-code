let net = require('net')
let fs = require('fs')

function demultiplex (source, destinations) {
	let channel_id_buf, chunk_length_buf
	source.on('readable', () => {
		let channel_id, chunk_length
		if (channel_id_buf === null) {
			channel_id_buf = source.read(1)
			channel_id = channel_id_buf && channel_id_buf.readInt8(0)
			if (channel_id == null) return
		}
		if (chunk_length_buf === null) {
			chunk_length_buf = source.read(4)
			chunk_length = chunk_length_buf && chunk_length_buf.readInt32BE(0)
			if (chunk_length == null) return
		}
		let chunk = source.read(chunk_length)
		if (chunk === null) return
		console.log(`channel id: ${channel_id}`)
		destinations[channel_id].write(chunk)
		channel_id_buf = null
		chunk_length_buf = null
	}).on('end', () => {
		destinations.forEach(dest => dest.end())
	})
}

net.createServer(socket => {
	const log_txt_ws = fs.createWriteStream('./log.txt');
	const err_txt_ws = fs.createWriteStream('./err.txt');
	demultiplex(socket, [log_txt_ws, err_txt_ws])
}).listen(3000, () => console.log("Listen on port 3000 successfully!"));

