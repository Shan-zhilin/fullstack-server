module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'healthy',
		{
		    h_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				primaryKey: true
			},
			u_id: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
            username: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
            class: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
            temperature:{
                type: DataTypes,
                allowNull: false
            },
            hot:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            goheighrisk:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isheighrisk:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            touchheighrisk:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            leaveout:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            hesuan:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            masknum:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            kills:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gohospital:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
			createtime: {
				type: DataTypes,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'healthy',
			timestamps: true,
			createdAt: 'createtime',
			updatedAt: fasle,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'h_id' }]
				}
			]
		}
	);
};