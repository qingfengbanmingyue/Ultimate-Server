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
//查看商品
router.get('', async (req, res) => {
  let commodity_ = await insertowner("commodity")
  let result = await commodity_.find().toArray()
  if (!result) {
    res.json({
      "code": 6000,
      "msg": "商品获取失败"
    })
  }
  res.json({
    code: 200,
    result
  })

})
//更新商品
router.put('', async (req, res) => {
  let commodity_ = await insertowner("commodity")
  let parse = req.body
  let id = parse.id

  let clear_type = parse.clear_type || '待定'
  let update_time = new Date()
  let describe = parse.describe || '无'
  let duration = parse.duration || '0分钟'
  let price = parse.price || '0元'
  if (!(Reflect.has(parse, 'id') || parse.id == '')) {

    res.json({
      "code": 6001,
      "msg": "缺少商品id"
    })
    client.close()
    return;
  }
  id = +id

  let commodity = await commodity_.find({
    "_id": id
  }).toArray()

  if (!commodity.length) {
    res.json({
      "code": 6002,
      "msg": "没有这个id或id无效"
    })
    client.close()
    return;
  }

  let result = await commodity_.updateOne({
    "_id": id
  }, {
    $set: {
      clear_type,
      describe,
      duration,
      price,
      update_time
    }
  })

  if (result.acknowledged) {
    res.json({
      code: 200,
      msg: '商品更新成功'
    })
  } else {
    res.json({
      code: 6003,
      msg: '商品更新失败请重试'
    })
  }
  client.close();
  return


})


module.exports = router