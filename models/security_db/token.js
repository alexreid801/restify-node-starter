module.exports = function( sequelize, DataTypes ){
	var Token = sequelize.define( 'Tokens', {
		
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		
		user_id: {
			type: DataTypes.UUID,
			defaultValue: ''
		},
		
		token_key: {
			type: DataTypes.TEXT,
			defaultValue: ''
		}
	},
	{
		tableName: 'user_token',
		timestamps: false
	} );
	return Token;
};