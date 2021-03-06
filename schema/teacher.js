module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'teachers',
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
			},
			head:{
				type: DataTypes.STRING(255),	
				allowNull: true
			},
			c_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			classes:{
				type:DataTypes.STRING(255),
				allowNull:true
			},
		},
		{
			sequelize,
			tableName: 'teachers',
			timestamps: true,
			createdAt: 'createtime',
			updatedAt: 'modifytime',
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
