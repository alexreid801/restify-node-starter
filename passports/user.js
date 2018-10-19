
module.exports = function( config ){

	var services = require( '../services' )( config );
	var BearerStrategy = require('passport-http-bearer').Strategy;
	var _ = require( 'lodash' );
	
	var security_service = services.security_service;
	
	var _this = this;
	
	config.passports.user.use( new BearerStrategy( { passReqToCallBack: true, scope: "user", realm: "user" }, function( token, done ){
		
		//console.dir( { user_token: token } );
		
	    security_service.check_auth( token ).then( function( authenticated ){
	    	//console.log( "trigger1" );
	    	//console.dir( { deviceAuthenticated: deviceAuthenticated } );
	    	
			if( authenticated ){
				security_service.get_logged_in_user( token ).then( function( user ){
					//console.log( "trigger3" );
					if( !_.isEmpty( user ) ){
						return done( null, user, { scope: 'all' } );
					}
					else return done( null, false );
				} ).catch( function( err ){
					
					return done( err );
				} );
			}
			else return done( null, false );
	    } ).catch( function( err ){
	    	
	    	return done( err );
	    } );
	} ) );
};