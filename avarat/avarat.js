const {
  json
} = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const upload = multer({
  dest: 'img/avaratImg'
}).single('avarat')

//链接数据库
const client = require('../db/db')
async function insertowner(col) {
  await client.connect()
  const db = client.db("server");
  const collection = db.collection(col);
  return collection;
}

// 上传头像
router.post('', async (req, res, next) => {
  upload(req, res, async (err) => {
    let avarat_ = await insertowner("avarat")
    let id = await avarat_.find().toArray()
    let _id = ++id.length
    let avarat = {
      _id
    }
    avarat.create_time = new Date()
    avarat.update_time = new Date()
    avarat.user = +req.body.user
    avarat.avarat_name = req.file.filename + req.file.originalname
    avarat.avarat_path = req.file.path + req.file.originalname
    if (!Object.is(req.file.mimetype, 'image/jpeg') && !Object.is(req.file.mimetype, 'image/png')) {
      res.json({
        code: 7000,
        msg: "请上传正确格式的图片！"
      })
    }
    let findres = await avarat_.find({
      user: +req.body.user
    }).toArray()
    if (!findres.length) {
      res.json({
        code: 7001,
        msg: "您已经上传过头像了"
      })
    }
    let reslut = await avarat_.insertOne(avarat)
    if (reslut.acknowledged) {
      res.json({
        code: 200,
        msg: "上传成功！",
      })
    } else {
      res.json({
        code: 7002,
        msg: "上传失败！"
      })
    }
    fs.renameSync(req.file.path, req.file.path + req.file.originalname, err => {
      if (err) {
        res.json({
          code: 7003,
          msg: "上传失败！"
        })
      }
    })
  })
})


// 更新头像
router.put('', async (req, res, next) => {
  let avarat_ = await insertowner("avarat")
  upload(req, res, async (err) => {
    let avarat = {}
    avarat.update_time = new Date()
    avarat.avarat_name = req.file.filename + req.file.originalname
    avarat.avarat_path = req.file.path + req.file.originalname
    if (!Object.is(req.file.mimetype, 'image/jpeg') && !Object.is(req.file.mimetype, 'image/png')) {
      res.json({
        code: 7004,
        msg: "请上传正确格式的图片！"
      })
    }
    let reslut = await avarat_.findOne({
      user: +req.body.user
    })
    if (reslut.length) {
      res.json({
        code: 7005,
        msg: '该用户没有头像，请上传'
      })
    }
    fs.rm(reslut.avarat_path, err => {
      console.log(err);
    })
    let updateres = await avarat_.updateOne({
      user: +req.body.user
    }, {
      $set: avarat
    })
    if (!updateres.acknowledged) {
      res.json({
        code: 7006,
        msg: '更新失败'
      })
    }
    fs.renameSync(req.file.path, req.file.path + req.file.originalname, err => {
      if (err) {
        res.json({
          code: 7007,
          msg: "修改失败！"
        })
      }
    })
    res.json({
      code: 200,
      msg: "更新成功！",
    })
  })
})


module.exports = router