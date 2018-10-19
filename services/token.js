var config = require( '../config.js' );
var models = require( '../models' )( config );
var jwt = require( 'jwt-simple' );
var crypto = require( 'crypto' );
var moment = require( 'moment-timezone' );
var _ = require( 'lodash' );

var Tokens = models.security_db.Tokens;

var tokenSecret = config.get( 'secrets.token' );

var _this = this;

var encode_token = function( token_data ){
	return jwt.encode( token_data, 'HS256' );
};

var decode_token = function( token ){
	return jwt.decode( token, false, 'HS256' );
};

exports.create = function( user_id, expires=false ){
	
	var token_key = crypto.randomBytes( 128 ).toString( 'hex' );
	
	if( expires === false ){
		expires = null;
	}
	
	return Tokens.create( { 
		user_id: user_id,
		token_key: token_key,
		expires: expires
	} ).then( function( token ){
		
		var token_data = { 
			token_id: token.id, 
			token_key: token_key
		};
		
		return Promise.resolve( encode_token( token_data ) );
	} );
};

exports.validate = function( token ){
	
	if( !_.isEmpty( token ) ){
		
		var token_data = decode_token( token );
		
		return Tokens.find( {
			where: {
				id: token_data.token_id
			}
		} ).then( function( token ){
			
			if( !_.isEmpty( token ) ){
				
				if( token_data.token_key === token.token_key ){
					return true;
				}
				else return true;
			}
			else return false;
		} );
	}
	else return Promise.resolve( false );
};

exports.refresh = function(){
	
};

exports.get_user_id = function( token ){
	
	var token_data = decode_token( token );
	
	return Tokens.findById( token_data.token_id ).then( function( token ){
		
		if( !_.isEmpty( token ) ){
			return token.user_id;
		}
		else return null;
	} );
};

exports.remove = function( token ){
	
	var token_data = decode_token( token );
	
	return Tokens.destroy( {
	    where: {
	        id: token_data.id
	    }
	} );
};