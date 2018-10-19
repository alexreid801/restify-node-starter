module.exports = function( sequelize, DataTypes ){
	var EmailAddresses = sequelize.define( 'EmailAddresses', {
		
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		
		user_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1
		},
		
		email: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		
		is_primary: {
			type: DataTypes.TINYINT,
			defaultValue: 0
		}
	},
	{
		tableName: 'user_email_address',
		timestamps: false
	} );
	return EmailAddresses;
};