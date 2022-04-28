module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'read',
		{
			r_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
