const express = require('express')
const router = express.Router()
const jwt = require('../keys/token')
const md5 = require("md5")
//链接数据库
const client = require('../db/db')

async function insertowner(col) {
  await client.connect()
  const db = client.db("server");
  const collection = db.collection(col);
  return collection;
}

//注册
router.post('/register', async (req, res) => {
  let user_ = await insertowner("user")
  let _id = await user_.find().toArray()
  _id = ++_id[_id.length - 1]._id
  let password = req.body.password
  let username = req.body.username
  if (!(Reflect.has(req.body, 'username') && Reflect.has(req.body, 'password'))) {
    res.json({
      status: 4000,
      msg: "请传入账号和密码"
    })
    return
  }
  if (Object.is(password, '') || Object.is(username, '')) {
    res.json({
      status: 4001,
      msg: "账号密码不能为空"
    })
    return
  }
  password = md5(password)
  let nickname = req.body.nickname || req.body.username
  let create_time = new Date()
  let update_time = new Date()
  let wallet = 0
  let avarat = req.body.avarat || ''
  let power = 1

  let reslut = await user_.findOne({
    "username": req.body.username
  })
  if (reslut) {
    res.json({
      code: 4002,
      msg: '用户名已存在！'
    })
    client.close()
    return;
  }
  let regReslut = await user_.insertOne({
    "_id": _id,
    username,
    password,
    nickname,
    wallet,
    avarat,
    power,
    create_time,
    update_time,

  })
  if (regReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '注册成功！'
    })
  } else {
    res.json({
      code: 4003,
      msg: '注册失败'
    })
  }
  client.close()
  return;
})

//登录
router.post('/login', async (req, res) => {
  let user_ = await insertowner("user")
  let parse = req.body
  let username = parse.username
  let password = parse.password
  if (!(Reflect.has(parse, 'username') && Reflect.has(parse, 'password'))) {

    res.json({
      status: 4000,
      msg: "请传入账号和密码"
    })
    return
  }

  if (Object.is(password, '') || Object.is(username, '')) {
    res.json({
      status: 4001,
      msg: "账号密码不能为空"
    })
    return
  }
  password = md5(password);

  let user = await user_.find({
    username,
    password
  }).toArray()
  if (user.length) {
    //签发证书
    const token = jwt.sign({
      _id: user[0]._id
    }, 60 * 60 * 12)
    // console.log(token);
    res.json({
      code: 200,
      msg: '登录成功',
      token
    })
  } else {
    res.json({
      code: 4004,
      msg: '没有这个账户,请注册'
    })
  }

  client.close()
  return;


})

//查看当前用户信息
router.post('/view', async (req, res) => {
  let user_ = await insertowner("user")
  let parse = req.body
  let username = parse.username
  let password = parse.password
  if (!(Reflect.has(parse, 'username') && Reflect.has(parse, 'password'))) {

    res.json({
      status: 4000,
      msg: "请传入账号和密码"
    })
    return
  }

  password = md5(password);
  console.log(password);
  let user = await user_.aggregate([{
    $match: {
      username
    }
  }, {
    $lookup: {
      from: "power",
      localField: "power",
      foreignField: "_id",
      as: "power",
    }
  }]).toArray()
  if (user == null) {
    res.json({
      code: 4005,
      msg: '账号密码错误'
    })
    return
  }

  if (user._id >= 2 && user._id <= 0) {
    res.json({
      code: 4006,
      msg: '您的权限不够'
    })
    return
  }


  res.json(user)



})

//更新当前用户信息
router.put('', async (req, res) => {
  let user_ = await insertowner("user")
  let parse = req.body
  let _id = parse._id
  let update_time = new Date()
  let password = parse.password
  let avarat = parse.avarat || ''
  let nickname = parse.nickname
  let wallet = parse.wallet || 0
  _id = +_id
  if (!(Reflect.has(parse, '_id') || parse._id == '')) {

    res.json({
      code: 4007,
      "msg": "缺少用户_id"
    })
    client.close()
    return;
  }

  if (!(Reflect.has(parse, 'password'))) {

    res.json({
      code: 4008,
      "msg": "请输入要更改的密码"
    })
    client.close()
    return;
  }

  let user = await user_.findOne({
    "_id": _id
  })
  if (user == null) {
    res.json({
      code: 4009,
      "msg": "没有这个_id或_id无效"
    })
    client.close()
    return;
  }
  if (user._id >= 2 && user._id <= 0) {
    res.json({
      code: 4006,
      msg: '您的权限不够'
    })
    return
  }
  password = md5(password)
  nickname = nickname || user.nickname
  let regReslut = await user_.updateOne({
    "_id": _id
  }, {
    $set: {
      avarat,
      nickname,
      password,
      update_time,
      wallet,
    }
  })

  if (regReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '用户更新成功'
    })
  } else {
    res.json({
      code: 4010,
      msg: '用户更新失败请重试'
    })
  }
  client.close();
  return

})


//获取当前用户信息
router.post('/getUserPromsg', async (req, res) => {
  let user_ = await insertowner("user")
  if (!Reflect.has(req.body, 'token')) {
    res.json({
      code: 4999,
      msg: '请传入token'
    })
    return
  }


  let token = req.body.token
  let result = jwt.verify(token)

  if (result.code == 200) {
    let _id = result.data._id
    let userPromsg = await user_.findOne({
      _id: Object_id(_id)
    })

    res.json({
      code: 200,
      userPromsg
    })
    return
  } else {
    res.json({
      code: 50000,
      msg: '未登录,请先登录'
    })
    return
  }
})

module.exports = router