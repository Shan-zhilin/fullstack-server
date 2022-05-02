const Sequelize = require('sequelize');

const sequelize = new Sequelize('school_epidemic', 'root', 'szl990203', {
	dialect: 'mysql',
	timezone: '+08:00',
	// 添加这个配置 是为了返回给前端时间是以 标准格式返回
	dialectOptions: {
		dateStrings: true,
		typeCast: true
	}
});

module.exports = sequelize;
