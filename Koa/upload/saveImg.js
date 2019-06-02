// scp uploadImg.js jack@52.183.24.147:/home/jack/upload_services
let Koa = require('koa')
let bodyparser = require('koa-bodyparser')
let Router = require('koa-router')
let multer = require('koa-multer')
let serve = require('koa-static-server')
let fs = require('fs')

require('es6-promise').polyfill()
let cors = require('koa-cors')

const UPLOAD_DOMAIN_PORT = 'http://www.dsyx.online:3000'
const getUniqueKey = () => Math.random().toString(36).slice(2, 10)

let app = new Koa()
app.use(bodyparser())
// app.use(serve({
//   rootDir: 'upload',
//   rootPath: '/upload'
// }))

// 设置CORS允许的源
app.use(cors({
  // origin: 'http://localhost:8000',
  origin: '*',
  commentCaptcha: ['GET', 'POST', 'DELETE', 'PUT']
}))

let router = new Router()
router.post('/upload', async ctx => {
  let { req } = ctx

  req.on('end', () => {
    ctx.body = JSON.stringify({ code: 0 })
  })
  req.on('data', chunk => {
    console.log(chunk)
  })
  // req.pipe(fs.createWriteStream('./upload/yay.jpg'))
})

app.use(router.routes())
app.use(router.allowedMethods())

const port = 3000
app.listen(port)
console.log(`Server has been listening on port ${port}`)