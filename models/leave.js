const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { DataTypes } = require("sequelize");
const Leave = require('../schema/leave')(sequelize, DataTypes);

// 改造 生成的token,添加c_id
// 使用in查询，使用c_id查询

/* 添加申请 */
async function addleave(args) {
    return await Leave.create(args);

}

// 查询申请
async function getAllLeave({ username, u_id, startTime, endTime, pageNum, currPage, classes }) {
    console.log({ username, u_id, startTime, endTime, pageNum, currPage, classes })
    // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
    const start = pageNum * (Number(currPage) - 1);
    const queryInfo = {}
    if (u_id) {
        queryInfo.u_id = u_id
    }
    if (username) {
        queryInfo.username = username
    }
    if (classes) {
        queryInfo.classes = {
            // 根据class 进行模糊查询
            [Op.like]: `%${classes}%`
        }
    }
    if (startTime) {
        queryInfo.createtime = {
            [Op.between]: [startTime, endTime]
        }
    }
    const data = await Leave.findAll({
        where: queryInfo,
        offset: start || 0,
        limit: Number(pageNum) || 10,
        order: [["createtime", "DESC"]],
    });

    const count = await Leave.count({where: queryInfo});

    return {
        count,
        data,
    };
}

module.exports = {
    addleave,
    getAllLeave
}