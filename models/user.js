const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('../schema/user')(sequelize,DataTypes);
const Read = require('../schema/read')(sequelize,DataTypes);
const {SIGNKEY} = require('../globals.js')
const jwtUtil = require('../utils/jwtutils');

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

/**
 * @description: 解密token
 * @param {*} token
 * @return {*} result
 */
async function getUserDataByToken({token}) {
  const result = await jwtUtil.verifysync(token,SIGNKEY)
  return result
}

/**
 * @description: 根据用户类型获取用户信息，包含分页等 并按照最近一次修改时间降序排列
 * @param {*} type pageNum currPage
 * @return {*} data total 
 */
async function getUsersByTypePage({queryInfo,pageNum,currPage}) {
  // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
  const start =  pageNum * (Number(currPage) - 1)

  const result = await User.findAll({
    where: queryInfo,
    offset: start, 
    limit: Number(pageNum),
    order:[['createtime', 'DESC']]
  })
  const count = await User.count({
    where: {
      type: queryInfo.type
    }
  })

  return {
    count,
    result
  }
}


/**
 *
 * @des 管理员删除用户操作
 * @param {*} ctx
 */
async function deleteUser({id}) {
    const delReadRes = await Read.destroy({
      where: {
        u_id:id  
      }
    })
    const delUserRes = await User.destroy({
      where: {
        id
      }
    })
    return delReadRes && delUserRes
}

module.exports = {
    login,
    getUserDataByToken,
    getUsersByTypePage,
    deleteUser
}