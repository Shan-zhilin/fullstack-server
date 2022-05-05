module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'read',
		{
			r_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				primaryKey: true
			},
            u_id: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            n_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
			username: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			head: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
            readtime: {
                type: DataTypes,
                allowNull: true
            }
		},
		{
			sequelize,
			tableName: 'read',
			timestamps: true,
			createdAt: 'readtime',
			updatedAt: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'r_id' }]
				}
			]
		}
	);
};
