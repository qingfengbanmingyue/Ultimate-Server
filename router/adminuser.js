const express = require('express')
const router = express.Router()

const md5 = require("md5")
//链接数据库
const client = require('../db/db')

async function insertowner(col) {
  await client.connect()
  const db = client.db("server");
  const collection = db.collection(col);
  return collection;
}


//注册管理员
router.post('', async (req, res) => {
  let user_ = await insertowner("user")
  let _id = await user_.find().toArray()
  _id = ++_id[_id.length - 1]._id
  let password = req.body.password
  let username = req.body.username
  if (!(Reflect.has(req.body, 'username') && Reflect.has(req.body, 'password'))) {
    res.json({
      code: 5000,
      msg: "请传入账号和密码"
    })
    return
  }
  if (Object.is(password, '') || Object.is(username, '')) {
    res.json({
      code: 5001,
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
  let power = 2


  let reslut = await user_.findOne({
    "username": req.body.username
  })
  if (reslut) {
    res.json({
      code: 5002,
      msg: '用户名已存在！'
    })
    client.close()
    return;
  }
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
    client.close()
    return;
  } else {
    res.json({
      code: 5003,
      msg: '注册失败'
    })
  }
  client.close()
  return;
})
//查看用户
router.get('', async (req, res) => {
  let user_ = await insertowner("user")
  const reslut = await user_.aggregate([{
    $match: {
      "power": 1
    }
  }, {
    $lookup: {
      from: "power",
      localField: "power",
      foreignField: "_id",
      as: "power",
    }
  }]).toArray()

  if (!reslut.length) {
    res.json({
      code: 5004,
      msg: '查看失败'
    })
    return
  }
  res.json({
    code: 200,
    reslut
  })
  client.close()
  return
})

//删除用户
router.delete('', async (req, res) => {
  let user_ = await insertowner("user")
  let parse = req.body
  if (!Reflect.has(parse, '_id')) {
    res.json({
      code: 5005,
      msg: '请传入要删除的用户_id'
    })
    client.close()
    return;

  }
  let _id = parse._id
  _id = +_id
  let result = await user_.findOne({
    '_id': _id
  })
  if (!result) {
    res.json({
      code: 5006,
      msg: '没有这个用户'
    })
    return
  }
  if (result.power >= 2 && result.power <= 0) {
    res.json({
      code: 5007,
      msg: '您的权限不足'
    })
    client.close()
    return;
  }
  let regReslut = await user_.deleteOne({
    "_id": _id
  })

  if (regReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '用户删除成功'
    })
    client.close()
    return;
  } else {
    res.json({
      code: 5008,
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
  if (!(Reflect.has(parse, '_id') || parse._id == null)) {

    res.json({
      code: 5009,
      msg: "缺少用户_id"
    })
    client.close()
    return;
  }

  if (!(Reflect.has(parse, 'password'))) {

    res.json({
      code: 5010,
      msg: "请输入要更改的密码"
    })
    client.close()
    return;
  }

  let user = await user_.find({
    "_id": +parse._id
  }).toArray()


  if (!user.length) {
    res.json({
      code: 5011,
      msg: "没有这个_id或_id无效"
    })
    client.close()
    return;
  }
  let userpower = await user_.findOne({
    "_id": +parse._id
  })
  if (userpower.power >= 2 || userpower.power <= 0) {
    res.json({
      code: 5012,
      msg: '您没有权限请重试'
    })
    client.close()
    return;
  }

  nickname = nickname || user[0].nickname
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
      code: 5013,
      msg: '用户更新失败请重试'
    })
  }
  client.close();
  return

})



module.exports = router