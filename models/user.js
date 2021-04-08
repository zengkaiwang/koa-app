/*
 * @Description: Description
 * @Author: wangzengkai
 * @Date: 2021-04-08 10:59:01
 * @LastEditors: wangzengkai
 * @LastEditTime: 2021-04-08 11:41:02
 */

const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// 账户的数据库模型
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  }
})

const User = mongoose.models.users || mongoose.model('users', UserSchema)

module.exports = User
