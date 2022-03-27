module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			username: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			idcard:{
				type:DataTypes.STRING(255),
				allowNull:false
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: true
			},
			notice: {
				type: DataTypes.TINYINT,
				allowNull: true
			},
			role: {
				type: DataTypes.TINYINT,
				allowNull: true
			},
			github: {
				type: DataTypes.TEXT,
				allowNull: true
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
