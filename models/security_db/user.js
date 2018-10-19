module.exports = function( sequelize, DataTypes ){
	var User = sequelize.define( 'Users', {
		
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		
		username: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		
		password_hash: {
			type: DataTypes.TEXT,
			defaultValue: ''
		}
	},
	{
		tableName: 'user',
		timestamps: false
	} );
	return User;
};