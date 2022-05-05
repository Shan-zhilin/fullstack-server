const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { DataTypes } = require("sequelize");
const Notice = require("../schema/notice")(sequelize, DataTypes);
const Read = require("../schema/read")(sequelize, DataTypes);

/**
 * @des 获取所有通知
 * @param {*} ctx
 * @returns noticeInfo
 */
async function getAllNotice({ title, startTime, endTime, pageNum, currPage, classes }) {
  // limit表示每页多少个,offset表示查第几页 按每一页多少条数据 进行分组
  const start = pageNum * (Number(currPage) - 1);
  const queryInfo = {}
  if (title) {
    queryInfo.title = title
  }
  if (classes) {
    queryInfo.class = {
      // 根据class 进行模糊查询
      [Op.like]: `%${classes}%`
    }
  }
  if (startTime != '') {
    queryInfo.createtime = {
      [Op.between]: [startTime, endTime]
    }
  }
  const data = await Notice.findAll({
    where: queryInfo,
    offset: start || 0,
    limit: Number(pageNum) || 10,
    order: [["createtime", "DESC"]],
  });

  const count = await Notice.count({ where: queryInfo });

  return {
    count,
    data,
  };
}

/* 获取阅读人数 */
async function getReadNum({ u_id }) {
  const result = await Read.findAll({
    where: { u_id }
  })
  return result
}

// 删除通知
async function deleteNotice({ n_id }) {
  const result = await Notice.destroy({
    where: { n_id }
  })
  return result
}

// 创建一个通知
async function createNotice({ title, classes, content, adjunct }) {
  const result = await Notice.create({
    title,
    content,
    class: classes,
    adjunct
  })
  return result
}

// 删除一个阅读
async function createRead({ n_id, u_id }) {
  console.log(u_id, n_id)
  const result = await Read.create(
    {
      n_id,
      u_id
    }
  )
  return result
}

module.exports = {
  getAllNotice,
  deleteNotice,
  createNotice,
  getReadNum,
  createRead
};
