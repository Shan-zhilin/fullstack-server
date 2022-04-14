const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Class = require('../schema/class')(sequelize,DataTypes);

// 查询所有班级信息
async function getClassInfo({queryInfo,pageNum,currPage}){
    // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
    const start = pageNum * (Number(currPage) - 1);
    const result = await Class.findAll({
        where: queryInfo,
        offset: start,
        limit: Number(pageNum),
    });
    const count = await Class.count();
    return {
        count,
        result,
    }
}

// 删除班级
async function deleteClass({c_id,classname}){
    const result = await Class.destroy({
        where: {
            c_id,
            classname,
        },
    });
    return result;
}

module.exports = {
    getClassInfo,
    deleteClass
}