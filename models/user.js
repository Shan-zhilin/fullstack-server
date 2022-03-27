const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('../schema/user')(sequelize,DataTypes);

/**
 * @description: 用户登录
 * @param {*} username
 * @return {*} userInfo
 */
 async function login({email,password}) {
    const userInfo = await User.findOne({
      where: {
        email,
        password
      }
    });
    return userInfo;
}
/**
 * @description: 用户注册
 * @param {*}
 * @return {*}
 */
 async function userRegister({ username, password, email,idcard }) {
  // 判断该用户是否已经注册过
  const isExit = await User.findOne({
    where: {
      email,
      idcard
    }
  });
  let date = new Date()
  if (!isExit) {
    const userinfo = await User.create({
      username: username,
      password: password,
      email: email,
      idcard:idcard,
    });
    return userinfo;
  } else {
    return "user exists";
  }
}

/* 
** description: 修改用户信息
 * @param {*}
 * @return {*}
 */
async function updateUserInfo({ username, password,email,idcard }) {
  const isMissing = await User.findOne({
    where:{
        username,
        idcard,
        email
    }
  })
  if (!isMissing) {
    return 'userinfo missing'
  }

  const userinfo = await User.update(
    { username, password },
    {
      where: {
        idcard
      }
    }
  );
  return userinfo;
}


module.exports = {
    login,
    userRegister,
    updateUserInfo
}