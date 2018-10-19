module.exports = function( sequelize, DataTypes ){
	var Users = sequelize.define( 'Users', {
		
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		
		first_name: {
			type: DataTypes.STRING,
			defaultValue: DataTypes.STRING
		},
		
		last_name: {
			type: DataTypes.STRING,
			defaultValue: DataTypes.STRING
		},
		
		nickname: {
			type: DataTypes.STRING,
			defaultValue: DataTypes.STRING
		}
	},
	{
		tableName: 'user',
		timestamps: false
	} );
	return Users;
};