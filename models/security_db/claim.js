module.exports = function( sequelize, DataTypes ){
	var Claim = sequelize.define( 'Claims', {
		
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		
		type: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
		
		claim_key_hash: {
			type: DataTypes.TEXT,
			defaultValue: ''
		}
	},
	{
		tableName: 'user_claim',
		timestamps: false
	} );
	return Claim;
};