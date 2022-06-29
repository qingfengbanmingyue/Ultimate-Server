const jwt = require('jsonwebtoken')
const fs = require('fs')
const {
  join
} = require('path')

let privateKey = fs.readFileSync(join(__dirname, 'Private_key.pem'));
let publicKey = fs.readFileSync(join(__dirname, 'Public_key.pem'));


class Jwt {
  privateKey = privateKey
  publicKey = publicKey
  jwt = jwt
  constructor() {}
  sign(payLoad, expiresIn = 60) {
    return jwt.sign(payLoad, privateKey, {
      algorithm: "RS256",
      expiresIn
    });
  }
  verify(token) {
    try {
      const result = jwt.verify(token, publicKey, {
        algorithm: "RS256"
      });
      return {
        code: 200,
        data: result
      }
    } catch (e) {

      switch (e.message) {
        case 'jwt expired':
          return {
            code: 40000,
              msg: '令牌过期'
          }
          case 'invalid token':
            return {
              code: 40001,
                msg: '无法解析标头或有效负载'
            }
            case 'jwt malformed':
              return {
                code: 40002,
                  msg: '令牌没有三个组件'
              }
              case 'jwt signature is required':
                return {
                  code: 40003,
                    msg: 'jwt signature is required'
                }
                case 'invalid signature':
                  return {
                    code: 40004,
                      msg: 'invalid signature'
                  }


      }
    }

  }

}

module.exports = new Jwt