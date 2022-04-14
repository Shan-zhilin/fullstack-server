const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Teacher = require('../schema/teacher')(sequelize,DataTypes);

// 查询单个教师
async function getTeacher({ username, password, type }){
    return await Student.findOne({
        where: {
          username,
        },
    });
}  

// 查询所有教师信息
async function getTeacherInfo({queryInfo,pageNum,currPage}){
    // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
    const start = pageNum * (Number(currPage) - 1);
    const result = await Teacher.findAll({
        where: queryInfo,
        offset: start,
        limit: Number(pageNum),
        order: [["createtime", "DESC"]],
    });
    const count = await Teacher.count();
    return {
        count,
        result,
    }
}

// 删除教师
async function deleteTeacher({id}) {
    let delUserRes = await Teacher.destroy({
        where: {
          id
        }
    })
    return delUserRes
}

// 修改教师信息
async function updateTeacher({id,updateInfo}){
    const result = await Teacher.update(updateInfo,{
        where: {
          id:id
        }
    })
    return result
}

module.exports = {
    updateTeacher,
    deleteTeacher,
    getTeacherInfo,
    getTeacher
}