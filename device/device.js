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

//查看设备
router.get('', async (req, res) => {
  let device_ = await insertowner("device")
  const deviceCollection = await device_.aggregate([{
      $lookup: {
        from: "device_state",
        localField: "device_state_id",
        foreignField: "_id",
        as: "device_state",
      },


    }

  ]).toArray()

  if (!deviceCollection.length) {
    res.json({
      code: 5100,
      msg: '设备获取失败'
    })
    return
  }

  res.json({
    code: 200,
    deviceCollection
  })

  client.close();
  return
})

//新增设备
router.post('', async (req, res) => {
  let device_ = await insertowner("device")
  let _id = await device_.find().toArray()
  _id = ++_id[_id.length - 1]._id

  let parse = req.body
  let device_name = parse.device_name
  let device_state_id = parse.device_state_id
  let create_time = new Date()
  let update_time = new Date()
  device_state_id = +device_state_id
  if (!(Reflect.has(parse, 'device_name') && Reflect.has(parse, 'device_state_id'))) {
    res.json({
      code: 5101,
      msg: '请输入设备名称和设备状态'
    })
    client.close()
    return
  }
  if (Object.is(device_state_id, '') && Object.is(device_name, '')) {
    res.json({
      code: 5102,
      msg: '请输入正确的设备名称和设备状态'
    })
    client.close()
    return
  }
  if (device_state_id < 0 || device_state_id > 4) {
    res.json({
      code: 5103,
      msg: '请传入正确的设备状态'
    })
    client.close()
    return;
  }

  let reslut = await device_.findOne({
    "device_name": device_name
  })
  if (reslut) {
    res.json({
      code: 5104,
      msg: '设备名称已存在,请重新输入'
    })
    client.close()
    return;
  }


  let deviceReslut = await device_.insertOne({
    "_id": _id,
    create_time,
    device_name,
    device_state_id,
    update_time
  })
  if (deviceReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '设备添加成功'
    })
  } else {
    res.json({
      code: 5105,
      msg: '设备添加失败请重试'
    })
  }
  client.close()
  return;



})
//删除设备
router.delete('', async (req, res) => {
  let device_ = await insertowner("device")
  let parse = req.body
  if (!Reflect.has(parse, '_id')) {
    res.json({
      code: 5106,
      msg: '请传入要删除的设备_id'
    })
    client.close()
    return;

  }
  let _id = parse._id
  _id = +_id


  let deviceReslut = await device_.deleteOne({
    "_id": _id
  })

  if (deviceReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '设备删除成功'
    })
  } else {
    res.json({
      code: 5107,
      msg: '设备删除失败请重试'
    })
  }
  client.close()
  return;

})
//更新设备
router.put('', async (req, res) => {
  let device_ = await insertowner("device")
  let parse = req.body
  let _id = parse._id
  let update_time = new Date()
  let device_name = parse.device_name
  let device_state_id = parse.device_state_id
  _id = +_id
  device_state_id = +device_state_id
  if (!(Reflect.has(parse, '_id') || parse._id == '')) {

    res.json({
      "status": 5108,
      "msg": "缺少设备_id"
    })
    client.close()
    return;
  }
  if (Object.is(device_state_id, undefined) && Object.is(device_name, undefined)) {
    res.json({
      code: 5109,
      msg: '请输入正确的设备名称和设备状态'
    })
    client.close()
    return
  }

  if (device_state_id < 0 || device_state_id > 4) {
    res.json({
      code: 5120,
      msg: '请传入正确的设备状态'
    })
    client.close()
    return;
  }

  let reslut = await device_.findOne({
    "device_name": device_name
  })
  if (reslut) {
    res.json({
      code: 5121,
      msg: '设备名称已存在,请重新输入'
    })
    client.close()
    return;
  }



  let device = await device_.find({
    "_id": _id
  }).toArray()

  if (!device.length) {
    res.json({
      "status": 5122,
      "msg": "没有这个_id或_id无效"
    })
    client.close()
    return;
  }
  let deviceReslut = await device_.updateOne({
    "_id": _id
  }, {
    $set: {
      device_name,
      update_time,
      device_state_id,
    }
  })

  if (deviceReslut.acknowledged) {
    res.json({
      code: 200,
      msg: '设备更新成功'
    })
  } else {
    res.json({
      code: 5123,
      msg: '设备更新失败请重试'
    })
  }
  client.close();
  return
})
module.exports = router