const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const upload = multer({
  dest: 'bannerImg/'
}).single('banner')

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
// 查看图片
router.get('', async (req, res) => {
  let banner_ = await insertowner('banner')
  let params = {}
  for (el in req.body) {
    has_id(req.body, el, params)
  }
  let reslut = await banner_.find(params).toArray()
  if (reslut.length) {
    res.json({
      code: 200,
      msg: "图片查找成功"
    })
    client.close()
    return;
  } else {
    res.json({
      code: 3100,
      msg: "没有找到相关图片"
    })
  }
})
// 上传图片(新增)
router.post('', async (req, res, next) => {
  upload(req, res, async (err) => {
    let banner_ = await insertowner("banner")
    let id = await banner_.find().toArray()
    let _id = ++id.length
    let banner = {
      _id
    }
    banner.create_time = new Date()
    banner.update_time = new Date()
    banner.banner_name = req.file.filename + req.file.originalname
    banner.path = req.file.path + req.file.originalname
    if (!Object.is(req.file.mimetype, 'image/jpeg') && !Object.is(req.file.mimetype, 'image/png')) {
      res.json({
        code: 3101,
        msg: "请上传正确格式的图片！"
      })
    }
    let reslut = await banner_.insertOne(banner)
    if (reslut.acknowledged) {
      res.json({
        code: 200,
        msg: "上传成功！",
      })
    } else {
      res.json({
        code: 3102,
        msg: "上传失败！"
      })
    }
    fs.renameSync(req.file.path, req.file.path + req.file.originalname, err => {
      if (err) {
        res.json({
          code: 3103,
          msg: "上传失败！"
        })
      }
    })
  })
})
// 更新图片
router.put('', async (req, res, next) => {
  let banner_ = await insertowner("banner")
  upload(req, res, async (err) => {
    let banner = {}
    banner.update_time = new Date()
    banner.banner_name = req.file.filename + req.file.originalname
    banner.path = req.file.path + req.file.originalname
    if (!Object.is(req.file.mimetype, 'image/jpeg') && !Object.is(req.file.mimetype, 'image/png')) {
      res.json({
        code: 3104,
        msg: "请上传正确格式的图片！"
      })
    }
    let reslut = await banner_.findOne({
      _id: +req.body._id
    })
    if (reslut) {
      // 删除旧图片文件
      fs.rm(reslut.path, err => {
        console.log(err);
      })
      // 更新数据库
      let updateres = await banner_.updateOne({
        _id: +req.body._id
      }, {
        $set: banner
      })
      if (!updateres.acknowledged) {
        res.json({
          code: 3105,
          msg: '更新失败'
        })
      }
      // 修改本地文件名
      fs.renameSync(req.file.path, req.file.path + req.file.originalname, err => {
        if (err) {
          res.json({
            code: 3106,
            msg: "修改失败！"
          })
        }
      })
      res.json({
        code: 200,
        msg: "更新成功！",
      })
    } else {
      res.json({
        code: 3107,
        msg: "没有找到该图片",
      })
    }
    client.close()
    return;
  })
})
// 删除图片
router.delete('', async (req, res) => {
  let banner_ = await insertowner("banner")
  let del = {}
  for (el in req.body) {
    has_id(req.body, el, del)
  }
  let reslut = await banner_.findOne(del)
  if (!reslut) {
    res.json({
      code: 3108,
      msg: "没有找到该图片",
    })
    client.close()
    return;
  } else {
    fs.rm(reslut.path, err => {
      if (err) {
        console.log(err);
      }
    })
    let delReslut = await banner_.deleteOne(del)
    if (delReslut.acknowledged) {
      res.json({
        code: 200,
        msg: "删除成功！",
      })
      client.close();
      return;
    } else {
      res.json({
        code: 3109,
        msg: "删除失败！"
      })
      client.close();
      return;
    }
  }
})

module.exports = router