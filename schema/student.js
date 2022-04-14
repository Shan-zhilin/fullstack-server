module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'students',
		{
			id: {
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
			tell:{
				type: DataTypes.STRING(20),
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
            grade: {
                type: DataTypes.INTEGER,
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
			tableName: 'students',
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
