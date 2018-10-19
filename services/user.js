var config = require( '../config.js' );
var models = require( '../models' )( config );
var _ = require( 'lodash' );

var Users = models.slcflix.Users;
var EmailAddresses = models.slcflix.EmailAddresses

exports.findByIdentity = function( identity ){
	
	if( !_.isEmpty( identity ) ){
				
		return EmailAddresses.find( {
			where: {
				email: identity.toLowerCase(),
				is_primary: 1
			}
		} ).then( function( userEmailAddress ){
			
			if( !_.isEmpty( userEmailAddress ) ){
				
				return Users.find( {
					id: userEmailAddress.user_id
				} );
			}
			else return Promise.reject(  );
		} )
	}
	else return Promise.reject(  );
};

exports.findAll = function(){
	
	return Users.findAll();
};