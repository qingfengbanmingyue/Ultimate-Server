const jwt = require('./token')
module.exports = (req, res, next) => {

  //验证token
  let token = req.headers.authorization

  if (!token) {
    res.json({
      code: 5000,
      msg: '未登录请先登录'
    })
    return
  }

  token = token.split(" ")[1]

  const result = jwt.verify(token)

  if (result.code == 200) {

    next()


  } else {

    res.json(result)
    return
  }



}