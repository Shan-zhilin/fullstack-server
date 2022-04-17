const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Class = require('../schema/class')(sequelize,DataTypes);

// 查询所有班级信息
async function getClassInfo({queryInfo,pageNum,currPage}){
    // 先判断是否进行的是条件查询
    if (currPage || queryInfo) {
        // 分页查询
        if (currPage && queryInfo) {
            // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
            const start = pageNum * (Number(currPage) - 1);
            const result = await Class.findAll({
                where: JSON.parse(queryInfo),
                offset: start,
                limit: Number(pageNum),
            });
            const count = await Class.count();
            return {
                count,
                result,
            }
        }else if(queryInfo){
            const result = await Class.findAll({
                where: JSON.parse(queryInfo),
            });
            return {result}
        }else {
            const result = await Class.findAll({
                offset: start,
                limit: Number(pageNum),
            });
            const count = await Class.count();
            return {
                count,
                result,
            }
        }
    }else {
        // 查询所有 
        const result = await Class.findAll();
        return {result}
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