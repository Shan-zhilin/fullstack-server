const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { DataTypes } = require("sequelize");
const Notice = require("../schema/notice")(sequelize, DataTypes);

/**
 * @des 获取所有通知
 * @param {*} ctx
 * @returns noticeInfo
 */
async function getAllNotice({ title, startTime, endTime, pageNum, currPage }) {
  // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
  const start = pageNum * (Number(currPage) - 1);
  const queryInfo = {}
  if (title) {
    queryInfo.title = title
  }else if (startTime) {
    queryInfo.createtime = {
      [Op.between]:[startTime,endTime]
    }
  }
  const data = await Notice.findAll({
    where: queryInfo,
    offset: start,
    limit: Number(pageNum),
    order: [["createtime", "DESC"]],
  });

  const count = await Notice.count();

  return {
    count,
    data,
  };
}

// 删除通知
async function deleteNotice({n_id}) {
  const result = await Notice.destroy({
    where: {n_id}
  })
  return result
}

// 创建一个通知
async function createNotice() {
  const result = await Notice.create({
    title: '111',
    content: 11,
    class: 1,
  })
  return result
}

module.exports = {
  getAllNotice,
  deleteNotice,
  createNotice
};
