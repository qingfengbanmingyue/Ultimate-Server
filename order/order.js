const express = require('express')
const router = express.Router()
//链接数据库
const client = require('../db/db')
async function insertowner(col) {
  await client.connect()
  const db = client.db("server");
  const collection = db.collection(col);
  return collection;
}
// 获取参数
function has_id(obj, str, newobj) {
  if (Reflect.has(obj, str)) {
    newobj[`${str}`] = +obj[`${str}`];
  }
}
// 生成一个时间戳
function timeStamp(obj) {
  let time = new Date()
  let num = time.toISOString() + Date.now()
  num = num.replace(/[:-]+/g, "").replace(".", "")
  return num
}





// 管理员
// 查看相关订单
router.get('', async (req, res) => {
  let order_ = await insertowner("order")
  let machine = {}
  for (el in req.body) {
    has_id(req.body, el, machine)
  }
  let reslut = await order_.find(machine).toArray()
  if (reslut.length) {
    res.json({
      code: 200,
      reslut
    })
  } else {
    res.json({
      code: 3000,
      msg: "没有找到相关订单，请重新写入条件"
    })
  }
  client.close()
  return
})
// 新增订单
router.post('', async (req, res) => {
  let order_ = await insertowner("order")
  if (!Reflect.has(req.body, "user") || !Reflect.has(req.body, "device") || !Reflect.has(req.body, "commodity")) {
    res.json({
      code: 3001,
      msg: "缺少必传参数！"
    })
  }
  let findReslut = await order_.find().toArray();
  let _id = findReslut[findReslut.length - 1]._id;
  let newOrder = {
    _id: ++_id
  };
  newOrder.order_num = timeStamp();
  newOrder.create_time = new Date();
  newOrder.update_time = new Date();
  newOrder.order_state = 2
  for (el in req.body) {
    newOrder[`${el}`] = +req.body[`${el}`]
  }
  let reslut = await order_.insertOne(newOrder)
  if (reslut.acknowledged) {
    res.json({
      code: 200,
      msg: "订单生成成功！",
    })
    client.close();
    return;
  } else {
    res.json({
      code: 3002,
      msg: "订单生成失败！",
    })
    client.close();
    return;
  }
})
// 订单更新
router.put("", async (req, res) => {
  let order_ = await insertowner("order")
  let _id;
  if (Reflect.has(req.body, "_id")) {
    _id = +req.body._id
  } else {
    res.json({
      code: 3003,
      msg: "缺少必传参数！"
    })
    client.close()
    return;
  }
  let params = {
    update_time: new Date()
  }
  for (el in req.body) {
    if (!Object.is(el, "_id")) {
      has_id(req.body, el, params)
    }
  }
  console.log(params);
  let reslut = await order_.updateOne({
    '_id': _id
  }, {
    $set: params
  })
  if (reslut.acknowledged) {
    res.json({
      code: 200,
      msg: "订单更新成功！",
    })
    client.close();
    return;
  } else {
    res.json({
      code: 3004,
      msg: "订单更新失败！",
    })
    client.close();
    return;
  }
})
module.exports = router