module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			id: {
				// autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			username: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			sex:{
				type:DataTypes.STRING(2),
				allowNull:false
			},
			classes: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			address: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			mailbox: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			modifytime:{
				type: DataTypes,
				allowNull: false
			},
			createtime: {
				type: DataTypes,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'user',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }]
				}
			]
		}
	);
};
