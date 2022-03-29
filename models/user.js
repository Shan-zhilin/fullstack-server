const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('../schema/user')(sequelize,DataTypes);
const {SIGNKEY} = require('../globals.js')
const jwtUtil = require('../utils/jwtutils')

/**
 * @description: 用户登录
 * @param {*} username
 * @return {*} userInfo
 */
 async function login({username,password,type}) {
    const userInfo = await User.findOne({
      where: {
        username,
        // password,
        // type
      }
    });
    return userInfo;
}

async function getUserDataByToken({token}) {
  const result = await jwtUtil.verifysync(token,SIGNKEY)
  return result
}

module.exports = {
    login,
    getUserDataByToken
}