module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'notice',
		{
			n_id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: true,
				primaryKey: true
			},
            title: {
                type: DataTypes,
                allowNull: false
            },
            content: {
                type: DataTypes,
                allowNull: true
            },
            createtime: {
                type: DataTypes,
                allowNull: true
            },
            class: {
                type: DataTypes,
                allowNull: false,
            }
		},
		{
			sequelize,
			tableName: 'notice',
			timestamps: true,
			createdAt: 'createtime',
			updatedAt: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'n_id' }]
				}
			]
		}
	);
};
