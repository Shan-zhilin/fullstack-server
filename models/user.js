const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Admin = require("../schema/admin")(sequelize, DataTypes);
const Student = require("./student");
const Teacher = require("./teacher");
const { SIGNKEY } = require("../globals.js");
const jwtUtil = require("../utils/jwtutils");

/**
 * @description: 用户登录
 * @param {*} username
 * @return {*} userInfo
 */
async function login({ username, password, type }) {
  if (type === 1) {
    return await Admin.findOne({
      where: {
        username,
      },
    });
  } else if (type === 2) {
    return await Student.getStudent({ username, password, type });
  } else {
    return await Teacher.getTeacher({ username, password, type });
  }
}

/**
 * @description: 解密token
 * @param {*} token
 * @return {*} result
 */
async function getUserDataByToken({ token }) {
  const result = await jwtUtil.verifysync(token, SIGNKEY);
  return result;
}

/**
 * @description: 根据用户类型获取用户信息，包含分页等 并按照最近一次修改时间降序排列
 * @param {*} type pageNum currPage
 * @return {*} data total
 */
async function getUsersByTypePage({ queryInfo, pageNum, currPage }) {
  const {type} = queryInfo
  if (type === 2) {
    return await Student.getStudentInfo({ queryInfo, pageNum, currPage });
  } else if (type === 3) {
    return await Teacher.getTeacherInfo({ queryInfo, pageNum, currPage });
  }
}

/**
 *
 * @des 管理员删除用户操作
 * @param {*} ctx
 */
async function deleteUser({ id, type }) {
  let result;
  if (type == 2) {
    result = await Student.deleteStudent({
      id,
    });
  } else {
    result = await Teacher.deleteTeacher({
      id,
    });
  }

  return result;
}

// 更新用户信息
async function updateUserInfo({ id, username, sex, address, type }) {
  let result;
  // 根据type类型判断是学生还是老师
  if (type == 2) {
    const updateInfo = {username,
      sex,
      address,
      type}
    result = await Student.updateStudent({
      id,updateInfo
    });
  } else if (type == 3) {
    const updateInfo = {
      type,
      username,
      sex,
      address,
      type,
    }
    result = await Teacher.updateTeacher({
      id,updateInfo
    });
  }

  return result[0];
}

module.exports = {
  login,
  getUserDataByToken,
  getUsersByTypePage,
  deleteUser,
  updateUserInfo,
};
