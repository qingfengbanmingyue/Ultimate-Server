const {
  MongoClient
} = require('mongodb')

const url = 'mongodb://1.15.113.218:12138'

const client = new MongoClient(url)

client.connect()



module.exports = client