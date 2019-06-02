let Koa = require('koa')

let app = new Koa()
// app.use(async (ctx, next) => {
// 	console.log(ctx.req.ip)
// 	next()
// })

// app.use(async ctx => {
// 	ctx.body = 'hello, koa!'
// })

app.listen(3000, () => {
	console.log('listened on 3000 successfully!')
})
