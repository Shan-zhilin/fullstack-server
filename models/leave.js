const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { DataTypes } = require("sequelize");
const Leave = require('../schema/leave')(sequelize, DataTypes);

/* 添加申请 */
async function addleave(args) {
    return await Leave.create(args);

}

// 查询申请
async function getAllLeave({c_id,username, u_id, starttime, endtime, pageNum, currPage, classes }) {
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
        queryInfo.classes = classes
    }
    if (c_id) {
        queryInfo.c_id = {
            [Op.in]: c_id.split(',')
        }
    }
    if (starttime) {
        queryInfo.createtime = {
            [Op.between]: [starttime, endtime]
        }
    }
    const result = await Leave.findAll({
        where: queryInfo,
        offset: start || 0,
        limit: Number(pageNum) || 10,
        order: [["createtime", "DESC"]],
    });

    const count = await Leave.count({where: queryInfo});

    return {
        count,
        result,
    };
}

module.exports = {
    addleave,
    getAllLeave
}