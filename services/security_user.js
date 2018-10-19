var config = require( '../config.js' );
var models = require( '../models' )( config );
var services = require( '../services' )( config );
var _ = require( 'lodash' );

var Users = models.security_db.Users;

var user_service = services.user_service;

exports.findByIdentity = function( identity ){

	if( !_.isEmpty( identity ) ){
	
		return user_service.findByIdentity( identity ).then( function( user ){
			
			return Users.findById( user.id );
			
		} ).catch( function(){
			
			return Users.find( {
				where: {
					username: identity
				}
			} ).then( function( user ){
				
				if( _.isEmpty( user ) ){
					return Promise.reject(  );
				}
				else return user;
			} )
		} );
	}
	else return Promise.reject(  );
};