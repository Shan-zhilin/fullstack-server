const Sequelize = require('sequelize');

const sequelize = new Sequelize('school_epidemic', 'root', 'szl990203', {
	dialect: 'mysql'
});

module.exports = sequelize;
