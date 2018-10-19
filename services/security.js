var config = require( '../config.js' );
var models = require( '../models' )( config );
var services = require( '../services' )( config );
var bcrypt = require( 'bcrypt' );
var moment = require( 'moment-timezone' );
var _ = require( 'lodash' );
;
var Users = models.security_db.Users;

var token_service = services.token_service;
var security_user_service = services.security_user_service;

var _this = this;

exports.login = function( identity, password ){
	
	return security_user_service.findByIdentity( identity ).then( function( user ){
		
		if( !_.isEmpty( user ) ){
			return bcrypt.compare( password, user.password_hash ).then( function( passwordsMatch ){
				
				if( passwordsMatch ){
					return token_service.create( user.id );
				}
				else return Promise.reject(  );
			} );
		}
		else return Promise.reject(  );
	} );
};

exports.check_auth = function( token ){
	
	return token_service.validate( token );
};

exports.get_logged_in_user_id = function( token ){
	
	return token_service.get_user_id( token );
};

exports.get_logged_in_user = function( token ){
	
	return _this.get_logged_in_user_id( token ).then( function( user_id ){
		
		return Users.findById( user_id );
	} );
};

exports.logout_device = function( token ){

	return token_service.remove( token );
};