const sequelize = require("../config/db");
const { DataTypes, Op, fn, where, col } = require("sequelize");
const Healthy = require('../schema/healthy')(sequelize, DataTypes);

/* 创建健康填报 */
async function createHealthyApply(arrgs) {
    const result = await Healthy.create(arrgs);
    return result;
}

// 首页今日填报人数模块
async function getTodayHealthyApplyNum() {
    /* 今日检测人数 */
    const isTest = await Healthy.count({
        where: {
            [Op.and]: [
                {
                    hesuan: 1
                },
                // 当天数据
                where(fn('TO_DAYS', col('createtime')), '=', fn('TO_DAYS', fn('NOW')))
                // 周数据
                // where(
                //     fn('YEARWEEK', col('created_at')),
                //     '=',
                //     fn('YEARWEEK', fn('NOW'))
                // )
                // 月数据
                // where(
                //   fn('DATE_FORMAT', col('created_at'), '%Y%m'),
                //   '=',
                //   fn('DATE_FORMAT', fn('CURDATE'), '%Y%m')
                // )
            ]
        }
    });
    /* 今日填报人数 */
    const isWrite = await Healthy.findAll({
        where: {
            [Op.and]: [
                where(fn('TO_DAYS', col('createtime')), '=', fn('TO_DAYS', fn('NOW')))
            ]
        }
    })
    // 今日高危人数
    const isHeigh = await Healthy.count({
        where: {
            [Op.and]: [
                {
                    temperature: {
                        [Op.gte]: 37.0
                    }
                },
                // 当天数据
                where(fn('TO_DAYS', col('createtime')), '=', fn('TO_DAYS', fn('NOW')))
            ]
        }
    })

    return {
        isTest, isWrite, isHeigh
    }
}

module.exports = {
    createHealthyApply,
    getTodayHealthyApplyNum
}
