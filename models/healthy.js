const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Healthy = require('../schema/healthy')(sequelize,DataTypes);

/* 创建健康填报 */
async function createHealthyApply(arrgs) {
    const result = await Healthy.create(arrgs);
    return result;
}

module.exports = {
    createHealthyApply
}
