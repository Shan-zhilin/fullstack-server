module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'healthy',
		{
		    h_id: {
                autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: true,
				primaryKey: true
			},
			u_id: {
				type: DataTypes.STRING,
				allowNull: false
			},
            username: {
				type: DataTypes.STRING,
				allowNull: false
			},
            class: {
				type: DataTypes.STRING,
				allowNull: false
			},
            temperature:{
                type: DataTypes.FLOAT,
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
				allowNull: true
			}
		},
		{
			sequelize,
			tableName: 'healthy',
			timestamps: true,
			createdAt: 'createtime',
			updatedAt: false,
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