module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'leavel',
		{
			l_id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: true,
				primaryKey: true
			},
			u_id: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			c_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			reason: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			leavetype:{
				type: DataTypes.STRING(11),
				allowNull: false
			},
			starttime:{
				type:DataTypes,
				allowNull:false
			},
			endtime: {
				type: DataTypes,
				allowNull: false
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			classes: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			username:{
				type: DataTypes.STRING(255),
				allowNull: true
			},
			createtime: {
				type: DataTypes,
				allowNull: true
			},
		},
		{
			sequelize,
			tableName: 'leavel',
			timestamps: true,
			createdAt: 'createtime',
			updatedAt: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'l_id' }]
				}
			]
		}
	);
};
