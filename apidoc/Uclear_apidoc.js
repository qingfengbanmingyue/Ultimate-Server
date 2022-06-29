//用户注册
/**
 *
 * @api {post} /user/register 用户注册
 * @apiName 用户注册
 * @apiGroup User
 * 
 * @apiParam {String} username 用户名(必传)
 * @apiParam {String} password 密码(必传)
 * @apiParam {String} [nickname] 昵称
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    msg: '注册成功！'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 4000,
 *    msg: '请传入账号和密码'
 *   },

 *   {
 *    code: 4001,
 *    msg: '账号密码不能为空'
 *   },
 * 
 *   {
 *    code: 4002,
 *    msg: '用户名已存在！'
 *   },
 * 
 *  {
 *    code: 4003,
 *    msg: '注册失败'
 *  },
 * 

 */


//用户登录
/**
 *
 * @api {post} /user/login 用户登录
 * @apiName 用户登录
 * @apiGroup User
 * 
 * @apiParam {String} username 用户名(必传)
 * @apiParam {String} password 密码(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    msg: '登录成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 4000,
 *    msg: '请传入账号和密码'
 *   },

 *   {
 *    code: 4001,
 *    msg: '账号密码不能为空'
 *   },
 * 
 *   {
 *    code: 4004,
 *    msg: '没有这个账户,请注册'
 *   },
 * 
 */


//用户查看
/**
 *
 * @api {post} /user/view 用户查看
 * @apiName 用户查看
 * @apiGroup User
 * 
 * @apiParam {String} username 用户名(必传)
 * @apiParam {String} password 密码(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    msg: '登录成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 4000,
 *    msg: '请传入账号和密码'
 *   },
 *
 *  {
 *    code: 4005,
 *    msg: '账号密码错误'
 *   },
 * 
 *  {
 *     code: 4006,
 *     msg: '您的权限不够'
 *  }
 * 
 */


//用户更新
/**
 *
 * @api {put} /user 用户更新
 * @apiName 用户更新
 * @apiGroup User
 * 
 * @apiParam {String} _id 用户_id(必传)
 * @apiParam {String} [password] 密码
 * @apiParam {String} [nickname] 昵称
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    msg: '更新成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 4006,
 *    msg: '您的权限不够'
 *   },
 *  {
 *    code: 4007,
 *    msg: '缺少用户_id'
 *   },

 *   {
 *    code: 4008,
 *    msg: '请输入要更改的密码'
 *   },
 * 
 *   {
 *    code: 4009,
 *    msg: '没有这个_id或_id无效'
 *   },
 * 
 *   {
 *    code: 4010,
 *    msg: '用户更新失败请重试'
 *   },
 */

//获取当前用户信息
/**
 *
 * @api {post} /user/getUserPromsg 用户token
 * @apiName 用户token
 * @apiGroup User
 * 
 * @apiParam {String} token token(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} result  返回查看数据
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    result
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 4999,
 *    msg: '请传入token'
 *   },
 *  {
 *    code: 50000,
 *    msg: '未登录,请先登录'
 *   },

 *   {
 *    code: 40000,
 *    msg: '令牌过期'
 *   },
 * 
 *   {
 *    code: 40001,
 *    msg: '无法解析标头或有效负载'
 *   },
 * 
 *   {
 *    code: 40002,
 *    msg: '令牌没有三个组件'
 *   },
 * 
 *   {
 *    code: 40003,
 *    msg: 'jwt signature is required'
 *   },
 * 
 *   {
 *    code: 40004,
 *    msg: 'inval_id signature'
 *   },
 * 
 */

//管理员注册
/**
 *
 * @api {post} /admin 管理员注册
 * @apiName 管理员注册
 * @apiGroup Admin
 * 
 * @apiParam {String} username 用户名(必传)
 * @apiParam {String} password 密码(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    msg: 注册成功！
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5000,
 *    msg: '请传入账号和密码'
 *   },

 *   {
 *    code: 5001,
 *    msg: '账号密码不能为空'
 *   },
 * 
 *   {
 *    code: 5002,
 *    msg: '用户名已存在！'
 *   },
 * 
 *   {
 *    code: 5003,
 *    msg: '注册失败'
 *   },
 * 
 * 
 */


//管理员查看用户
/**
 *
 * @api {get} /admin 查看用户
 * @apiName 查看用户
 * @apiGroup Admin
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code:200,
 *   reslut
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5004,
 *    msg: '查看失败'
 *   }
 * 
 */

//管理员删除用户
/**
 *
 * @api {delete} /admin 删除用户
 * @apiName 删除用户
 * @apiGroup Admin
 * @apiParam {String} _id 用户_id(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code: 200,
 *   msg: '用户删除成功'
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5005,
 *    msg: '请传入要删除的用户_id'
 *   },
 * 
 *  {
 *    code: 5006,
 *    msg: '您的权限不足'
 *   } 
 *
 *  {
 *    code: 5007,
 *     msg: '您的权限不足'
 *   }
 * 
 *   {
 *     code: 5008,
 *     msg: '用户删除失败请重试'
 *   }
 * 
 */



//管理员更新用户
/**
 *
 * @api {put} /admin 更新用户
 * @apiName 更新用户
 * @apiGroup Admin
 * @apiParam {String} _id 用户_id(必传)
 * @apiParam {String} password 用户密码(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code: 200,
 *   msg: '用户更新成功'
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5009,
 *    msg: '缺少用户_id'
 *   },
 * 
 *  {
 *    code: 5010,
 *    msg: '请输入要更改的密码'
 *   }
 *  {
 *    code: 5011,
 *    msg: '没有这个_id或_id无效'
 *   }
 *  {
 *    code: 5012,
 *    msg: '您没有权限请重试'
 *   }
 * 
 *  {  
 *   code: 5013,
 *   msg: '用户更新失败请重试'
 *   }
 */




//超级管理员查看用户
/**
 *
 * @api {get} /root 查看所有用户
 * @apiName 查看所有用户
 * @apiGroup Root
 * 
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code:200,
 *   reslut
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 404,
 *    msg: '查看失败'
 *   }
 * 
 */

//超级管理员删除用户
/**
 *
 * @api {delete} /root 删除用户
 * @apiName 删除用户
 * @apiGroup Root
 * @apiParam {String} _id 用户_id(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code: 200,
 *   msg: '用户删除成功'
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 405,
 *    msg: '请传入要删除的用户_id'
 *   },
 *  {
 *    code: 406,
 *    msg: '没有这个用户请重试'
 *   },
 *  {
 *    code: 407,
 *    msg: '您不能删除自己'
 *   } 
 *
 *  {
 *    code: 408,
 *     msg: '用户删除失败请重试'
 *   }
 * 

 * 
 */



//超级管理员更新用户
/**
 *
 * @api {put} /root 更新用户
 * @apiName 更新用户
 * @apiGroup Root
 * @apiParam {String} _id 用户_id(必传)
 * @apiParam {String} password 用户密码(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code: 200,
 *   msg: '用户更新成功'
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 409,
 *    msg: '缺少用户_id'
 *   },
 * 
 *  {
 *    code: 410,
 *    msg: '请输入要更改的密码'
 *   }
 *  {
 *    code: 411,
 *    msg: '没有这个_id或_id无效'
 *   }
 *  {
 *    code: 412,
 *    msg: '用户更新失败请重试'
 *   }

 */


//超级管理员增加用户
/**
 *
 * @api {put} /root 注册用户
 * @apiName 注册用户
 * @apiGroup Root
 * @apiParam {String} username 用户账号(必传)
 * @apiParam {String} password 用户密码(必传)
 * @apiParam {Number} power 用户权限(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} msg  成功描述
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   code: 200,
 *   msg: '用户更新成功'
 *   }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 413,
 *    msg: '请传入账号和密码'
 *   },
 * 
 *  {
 *    code: 414,
 *    msg: '账号密码不能为空'
 *   }
 *  {
 *    code: 415,
 *    msg: '您只能注册管理员和普通用户'
 *   }
 *  {
 *    code: 416,
 *    msg: '用户名已存在！'
 *   }
 *    code: 417,
 *    msg: '注册失败'
 *   }
 */


//查看设备
/**
 *
 * @api {get} /device 查看设备
 * @apiName 查看设备
 * @apiGroup device
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {string} result  返回查看数据
 * 
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    result
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5100,
 *    msg: '设备获取失败'
 *   },
 * 
 */

//新增设备

/**
 *
 * @api {post} /device 新增设备
 * @apiName 新增设备
 * @apiGroup device
 * 
 * @apiParam {string} device_name 设备名字(必传)
 * @apiParam {string} device_state_id 设备状态(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
      msg: '设备添加成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5101,
 *    msg: '请输入设备名称和设备状态'
 *   },
 *  {
 *    code: 5102,
 *    msg: '请输入正确的设备名称和设备状态'
 *   },
 *  {
 *    code: 5103,
 *    msg: '请传入正确的设备状态'
 *   },
 *  {
 *    code: 5104,
 *    msg: '设备名称已存在,请重新输入'
 *   }, 
 *  {
 *    code: 5105,
 *    msg: '设备添加失败请重试'
 *   },
 */

//删除设备

/**
 *
 * @api {delete} /device 删除设备
 * @apiName 删除设备
 * @apiGroup device
 * 
 * @apiParam {Number} _id 设备_id(必传)
 * @apiParam {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
      msg: '设备删除成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 *  {
 *    code: 5106,
 *    msg: '请传入要删除的设备_id'
 *   },
 *  {
 *    code: 5107,
 *    msg: '设备删除失败请重试'
 *   },
 *
 */

//更新设备

/**
 *
 * @api {put} /device 更新设备
 * @apiName 更新设备
 * @apiGroup device
 * 
 * @apiParam {Number} _id 设备_id(必传)
 * @apiParam {String} device_name 设备名称(必传)
 * @apiParam {String} device_state 设备状态(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
      msg: '设备更新成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:
 * {
      "status": 5108,
      "msg": "缺少设备_id"
    }
 * {
 *     code: 5109,
 *     msg: '请输入正确的设备名称和设备状态'
 *   }
 *  {
 *    code: 5120,
 *    msg: '请传入正确的设备状态'
 *   },
 *
 *  {
 *    code: 5121,
 *    msg: '设备名称已存在,请重新输入'
 *   },
 * {
 *    "status": 5122,
 *     "msg": "没有这个_id或_id无效"
 *   }
 *  {
 *    code: 5123,
 *    msg: '设备更新失败请重试'
 *   },
 */


//查看商品

/**
 *
 * @api {get} /commodity 查看商品
 * @apiName 查看商品
 * @apiGroup commodity
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} result 返回商品信息
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *    result
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 6000,
 *    msg: '商品获取失败'
 *   },
 *
 */

//更新商品


/**
 *
 * @api {put} /commodity 更新商品
 * @apiName 更新商品
 * @apiGroup commodity
 * 
 * @apiParam {Number} _id 商品_id(必传)
 * @apiParam {String} [clear_type] 商品名称
 * @apiParam {String} [describe] 商品介绍
 * @apiParam {String} [duration] 洗衣时长
 * @apiParam {String} [price] 商品价格
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
      msg: '商品更新成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 6001,
 *    msg: '缺少商品_id'
 *   },
 *
 * 
  * {
 *    code: 6002,
 *    msg: '没有这个_id或_id无效'
 *   },
 * 
 *  {
 *    code: 6003,
 *    msg: '商品更新失败请重试'
 *   },
 */

//管理员查看订单

/**
 *
 * @api {get} /order 查看订单
 * @apiName 查看订单
 * @apiGroup order
 * 
 * @apiParam {Number} [_id] 订单_id
 * @apiParam {Number} [user] 用户_id
 * @apiParam {Number} [device] 设备_id
 * @apiParam {Number} [order_state] 订单状态
 * @apiParam {Number} [commodity] 商品_id
 * @apiParam {String} [price] 商品价格
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *    code: 200,
 *     reslut
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3000,
 *    msg: '没有找到相关订单，请重新写入条件'
 *   },
 *
 * 
 */

//新增订单

/**
 *
 * @api {post} /order 新增订单
 * @apiName 新增订单
 * @apiGroup order
 * 
 * @apiParam {Number} user 用户_id
 * @apiParam {Number} device 设备_id
 * @apiParam {Number} commodity 商品_id
 * @apiParam {String} price 商品价格
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *     msg:'订单生成成功！'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3001,
 *    msg: '缺少必传参数！'
 *   },
 *   {
 *    code: 3002,
 *    msg: '订单生成失败！'
 *   },
 * 
 */

//订单更新

/**
 *
 * @api {put} /order 更新订单
 * @apiName 更新订单
 * @apiGroup order
 * @apiParam {Number} _id 订单_id
 * @apiParam {Number} [user] 用户_id
 * @apiParam {Number} [device] 设备_id
 * @apiParam {Number} [commodity] 商品_id
 * @apiParam {String} [price] 商品价格
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *     msg:'订单更新成功！'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3003,
 *    msg: '缺少必传参数！'
 *   },
 *   {
 *    code: 3004,
 *    msg: '订单更新失败！'
 *   },
 * 
 */

//上传头像

/**
 *
 * @api {post} /avarat 上传头像
 * @apiName 上传头像
 * @apiGroup avarat
 * @apiParam {file} file JPG格式/PNG图片格式(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *     msg:'上传成功！'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 7000,
 *    msg: '请上传正确格式的图片！'
 *   },
 *   {
 *    code: 7001,
 *    msg: '您已经上传过头像了'
 *   },
 * 
 *  {
 *    code: 7002,
 *    msg: '上传失败！'
 *   },
 *   {
 *    code: 7003,
 *    msg: '上传失败！'
 *   },
 * 
 * 
 */

//更新头像

/**
 *
 * @api {put} /avarat 更新头像
 * @apiName 更新头像
 * @apiGroup avarat
 * @apiParam {file} file JPG格式/PNG图片格式(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *      msg:'更新成功！'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 7004,
 *    msg: '请上传正确格式的图片！'
 *   },
 *   {
 *    code: 7005,
 *    msg: '该用户没有头像，请上传'
 *   },
 * 
 *  {
 *    code: 7006,
 *    msg: '更新失败'
 *   },
 *   {
 *    code: 7007,
 *    msg: '修改失败！'
 *   },
 * 
 * 
 */

//查看图片

/**
 *
 * @api {get} /banner 查看图片
 * @apiName 查看图片
 * @apiGroup banner
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *      msg:'图片查找成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3100,
 *    msg: '没有找到相关图片'
 *   },
 * 
 * 
 */


//上传图片

/**
 *
 * @api {post} /banner 上传图片
 * @apiName 上传图片
 * @apiGroup banner
 * @apiParam {file} file JPG格式/PNG图片格式(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *      msg:'图片上传成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3101,
 *    msg: '请上传正确格式的图片！'
 *   },
 *  {
 *    code: 3102,
 *    msg: '上传失败！'
 *   },
 * 
 *  {
 *    code: 3103,
 *    msg: '上传失败！'
 *   },
 */

//更新图片

/**
 *
 * @api {put} /banner 更新图片
 * @apiName 更新图片
 * @apiGroup banner
 * @apiParam {file} file JPG格式/PNG图片格式(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *      msg:'更新成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3104,
 *    msg: '请上传正确格式的图片！'
 *   },
 * 
 *  {
 *    code: 3105,
 *    msg: '更新失败！'
 *   },
 * 
 *  {
 *    code: 3106,
 *    msg: '修改失败！'
 *   },
 * 
 *  {
 *    code: 3107,
 *    msg: '没有找到该图片'
 *   },
 */


//删除图片

/**
 *
 * @api {delete} /banner 删除图片
 * @apiName 删除图片
 * @apiGroup banner
 * @apiParam {Number} _id 图片_id(必传)
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg 成功描述
 * @apiSuccessExample Success-Response:
 *   {
 *     code: 200,
 *      msg:'删除成功'
 *    }
 * 
 * @apiError {Number} code 400x状态码
 * @apiError {string} msg  问题描述
 * @apiErrorExample Error-Response:

 *  {
 *    code: 3108,
 *    msg: '没有找到该图片'
 *   },
 * 
 *  {
 *    code: 3109,
 *    msg: '删除失败！'
 *   },
 * 
 */