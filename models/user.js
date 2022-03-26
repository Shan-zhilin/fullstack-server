const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('../schema/user')(sequelize,DataTypes);

/**
 * @description: 用户登录
 * @param {*} username
 * @return {*} userInfo
 */
 async function login(username) {
    const userInfo = await User.findOne({
      where: {
        username
      }
    });
    return userInfo;
}

module.exports = {
    login
}