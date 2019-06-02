// scp uploadImg.js jack@52.183.24.147:/home/jack/upload_services
let Koa = require('koa')
let bodyparser = require('koa-bodyparser')
let Router = require('koa-router')
let multer = require('koa-multer')
let serve = require('koa-static-server')

require('es6-promise').polyfill()
let cors = require('koa-cors')

const UPLOAD_DOMAIN_PORT = 'http://www.qingtai.online:3000'
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
  origin: 'http://www.qingtai.online',
  commentCaptcha: ['GET', 'POST', 'DELETE', 'PUT']
}))

let router = new Router()

let storage = multer.diskStorage({
  destination(req, file, cb) {
    let imgType = req.body.type
    console.log(imgType)
    cb(null, `upload/${imgType}`)
  },
  filename(req, file, cb) {
    let ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}_${getUniqueKey()}.${ext}`)
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    let { filename, mimetype, size } = file
    let ext = mimetype.split('/').pop()
    cb(null, !!(ext.match(/jpeg|png|gif|bmp|svg\+xml/)))
  }
})
router.post('/upload', async ctx => {
  try {
    await upload.single('uploadImg')(ctx)
    let { filename } = ctx.req.file
    let imgType = ctx.req.body.type

    let url = `${UPLOAD_DOMAIN_PORT}/upload/${imgType}/${filename}`
    ctx.body = JSON.stringify({
      status: 'done',
      data: {
        link: url
      }
    })
  } catch (e) {
    console.log(e)
    ctx.status = 400
    ctx.body = e.message
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

const port = 3000
app.listen(port)
console.log(`Server has been listening on port ${port}`)