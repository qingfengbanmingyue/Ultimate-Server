const express = require('express')
const router = express.Router()
const jwt = require('../keys/token')
const md5 = require('md5')
//链接数据库
const client = require('../db/db')

async function insertowner(col) {
  await client.connect()
  const db = client.db("server");
  const collection = db.collection(col);
  return collection;
}

//查看用户
router.get('', async (req, res) => {
  let user_ = await insertowner("user")
  const reslut = await user_.aggregate([{
    $lookup: {
      from: "power",
      localField: "power",
      foreignField: "_id",
      as: "power",
    }
  }]).toArray()

  if (!reslut.length) {
    res.json({
      code: 404,
      msg: '查看失败'
    })
    return
  }

  res.json({
    code: 200,
    reslut
  })
})

//删除用户
router.delete('', async (req, res) => {
  let user_ = await insertowner("user")
  let parse = req.body
  if (!Reflect.has(parse, '_id')) {
    res.json({
      code: 405,
      msg: '请传入要删除的用户_id'
    })
    client.close()
    return;

  }
  let _id = parse._id
  _id = +_id

  let result = await user_.findOne({
    "_id": _id
  })
  console.log(result);
  if (!result) {
    res.json({
      code: 406,
      msg: '没有这个用户请重试'
    })
    return
  }

  if (result.power === 3) {
    res.json({
      code: 407,
      msg: '您不能删除自己'
    })
    return
  }
  let regReslut = await user_.deleteOne({
    "_id": _id
  })

  if (regReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '用户删除成功'
    })
  } else {
    res.json({
      code: 408,
      msg: '用户删除失败请重试'
    })
  }
  client.close()
  return;

})
//更新用户
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
      "status": 409,
      "msg": "缺少用户_id"
    })
    client.close()
    return;
  }

  if (!(Reflect.has(parse, 'password'))) {

    res.json({
      "status": 410,
      "msg": "请输入要更改的密码"
    })
    client.close()
    return;
  }

  let user = await user_.find({
    "_id": _id
  }).toArray()


  if (!user.length) {
    res.json({
      "status": 411,
      "msg": "没有这个_id或_id无效"
    })
    client.close()
    return;
  }
  nickname = nickname || user[0].nickname
  password = md5(password)
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
      code: 412,
      msg: '用户更新失败请重试'
    })
  }
  client.close();
  return

})

//注册管理员或普通用户
router.post('', async (req, res) => {
  let user_ = await insertowner("user")
  let _id = await user_.find().toArray()
  _id = ++_id[_id.length - 1]._id
  let password = req.body.password
  let username = req.body.username
  if (!((Reflect.has(req.body, 'username') && Reflect.has(req.body, 'password')))) {
    res.json({
      code: 413,
      msg: "请传入账号和密码"
    })
    return
  }
  if (Object.is(password, '') || Object.is(username, '')) {
    res.json({
      code: 414,
      msg: "账号密码不能为空"
    })
    return
  }
  password = md5(password)
  let nickname = req.body.nickname || req.body.username
  let create_time = new Date()
  let update_time = new Date()
  let wallet = 0
  //头像图片地址
  let avarat = req.body.avarat || ''
  let power = req.body.power || 2
  power = +power

  if (power >= 3 || power <= 0) {
    res.json({
      code: 415,
      msg: '您只能注册管理员和普通用户'
    })
    return;
  }

  let reslut = await user_.findOne({
    "username": req.body.username
  })
  if (reslut) {
    res.json({
      code: 416,
      msg: '用户名已存在！'
    })
    client.close()
    return;
  }
  username = md5(username)
  let regReslut = await user_.insertOne({
    "_id": _id,
    avarat,
    create_time,
    nickname,
    password,
    power,
    update_time,
    username,
    wallet,
  })

  if (regReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '注册成功！'
    })
  } else {
    res.json({
      code: 417,
      msg: '注册失败'
    })
  }
  client.close()
  return;
})

module.exports = router