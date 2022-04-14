module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'class',
		{
			c_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
            classname: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            numbers: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            grade: {
                type: DataTypes,
                allowNull: false
            }
		},
		{
			sequelize,
			tableName: 'class',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'c_id' }]
				}
			]
		}
	);
};
