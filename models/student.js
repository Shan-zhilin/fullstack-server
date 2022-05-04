const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Student = require('../schema/student')(sequelize, DataTypes);
const Read = require("../schema/read")(sequelize, DataTypes);

// 查询单个学生
async function getStudent({ id }) {
  return await Student.findOne({
    where: {
      id,
    },
  });
}
// 查询所有学生信息
async function getStudentInfo({ queryInfo, pageNum, currPage }) {
  // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
  const start = pageNum * (Number(currPage) - 1);
  const result = await Student.findAll({
    where: queryInfo,
    offset: start,
    limit: Number(pageNum),
    order: [["createtime", "DESC"]],
  });
  const count = await Student.count({ where: queryInfo });
  return {
    count,
    result,
  }
}


// 删除学生
async function deleteStudent({ id }) {
  console.log(id)
  let delReadRes = await Read.destroy({
    where: {
      u_id: id
    }
  })
  let delUserRes = await Student.destroy({
    where: {
      id
    }
  })
  return delReadRes || delUserRes
}

// 修改学生信息
async function updateStudent({ info }) {
  return await Student.update(info, {
    where: {
      id: info.id
    },
  })
}

// 添加学生
async function createStudent(args) {
  // 判断学生是否存在
  let isexit = await Student.findOne({ where: { id: args.id } })
  if (isexit) return 'exit'
  return await Student.create(args)
}

module.exports = {
  updateStudent,
  deleteStudent,
  getStudentInfo,
  getStudent,
  createStudent
}