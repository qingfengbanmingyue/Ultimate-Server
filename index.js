const express = require('express')

const app = express()

const {
  join,
  resolve
} = require('path')

const Validate_token = require('./keys/Validate_token')

const login = require('./router/login.js')

const device = require('./device/device')

const order = require('./order/order')

const avarat = require('./avarat/avarat')

const banner = require('./banner/banner')

const commodity = require('./commodity/commodity')

const log = require('./logs/log')

const cors = require('cors')

const rootuser = require('./router/root')

const adminuser = require('./router/adminuser')



app.get('/doc', (req, res) => {
  console.log(join(__dirname, '/apidoc', 'assets'))
  res.sendFile(join(__dirname, "/apidoc", "index.html"))
})



app.use(express.urlencoded())

app.use(express.json())

//解决跨域
app.use(cors())

//挂载设备路由
app.use('/device', device)

//挂载订单路由
app.use('/order', order)

//暴露api文档
app.use(express.static(join(__dirname, '/apidoc')))

//挂载轮播图路由
app.use('/banner', banner)

//暴露轮播图资源
app.use(express.static(join(__dirname, '/bannerImg')))

//挂载商品路由
app.use('/commodity', commodity)

//挂载注册路由
app.use('/user', login)

// 挂载token验证
// app.use(Validate_token)

//挂载超级管理员root路由
app.use('/root', rootuser)

//挂载管理员用户admin路由
app.use('/admin', adminuser)

//挂载用户路由
app.use('/user', login)

//暴露静态文件(头像)资源
app.use(express.static(join(__dirname, '/avaratimg')))

//挂载上传头像路由
app.use('/avarat', avarat)


app.listen("3001", () => {
  console.log('服务器启动成功');
})