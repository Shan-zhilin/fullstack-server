const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Student = require('../schema/student')(sequelize,DataTypes);
const Read = require("../schema/read")(sequelize, DataTypes);

// 查询单个学生
async function getStudent({ username, password, type }){
    return await Student.findOne({
        where: {
          username,
        },
    });
}
// 查询所有学生信息
async function getStudentInfo({ queryInfo, pageNum, currPage }){
    // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
  const start = pageNum * (Number(currPage) - 1);
  const result = await Student.findAll({
    where: queryInfo,
    offset: start,
    limit: Number(pageNum),
    order: [["createtime", "DESC"]],
  });
  const count = await Student.count();
  return {
    count,
    result,
  }
}

// 删除学生
async function deleteStudent({id}) {
    console.log(id)
    let delReadRes = await Read.destroy({
        where: {
          u_id:id 
        }
      })
    let  delUserRes = await Student.destroy({
        where: {
          id
        }
    })
    return delReadRes || delUserRes
}

// 修改学生信息
async function updateStudent({id,updateInfo}){
    return await Student.update(updateInfo,{
        where: {
          id:id
        }
    })
}

module.exports = {
    updateStudent,
    deleteStudent,
    getStudentInfo,
    getStudent
}