module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			r_id: {
				// autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
            u_id: {
                type: DataTypes.INTEGER,
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
			timestamps: false,
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
