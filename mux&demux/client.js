let net = require('net')
let child_process = require('child_process')

function multiplex (sources, destination) {
	let source_count = sources.length
	for (let i = 0; i < source_count; i++) {
		sources[i].on('readable', function () {
			let log_from_console
			while (null !== (log_from_console = this.read())) {
				let chunk = Buffer.alloc(1 + 4 + log_from_console.length)
				// Buffer在Node.js中为全局变量
				chunk.writeInt8(i, 0) // 注意循环中如果变量i不使用let声明，由于闭包会恒为循环结束之后的值
				chunk.writeInt32BE(log_from_console.length, 1)
				log_from_console.copy(chunk, 5)
				console.log(`Channel ${i} send: ${chunk}`)
				destination.write(chunk)
			}
		}).on('end', () => {
			if (--source_count === 0) {
				destination.end()
			}
		})
	}
}

// node client.js client_log.js
let socket = net.createConnection(3000, () => {
	let sub_process = child_process.fork(
		process.argv[2], [], {silent: true}) // 第二个参数需要传数组对象，否则创建出来的子进程对象的stdout等属性为null
	multiplex([sub_process.stdout, sub_process.stderr], socket)
});