module.exports = function( passport, config ){

	var services = require( './services' )( config );
	var BearerStrategy = require('passport-http-bearer').Strategy;
	var _ = require( 'lodash' );
	
	var security_service = services.security_service;
	
	var _this = this;
	
	passport.use( new BearerStrategy( { passReqToCallBack: false }, function( req, token, done ){
		
		console.dir( { device_token: token } );
		
	    security_service.check_auth( token ).then( function( authenticated ){
	    	
	    	console.log( "trigger1" );
	    	if( authenticated ){
	    		console.log( "trigger2" );
	    		security_service.get_logged_in_user( token ).then( function( user ){
	    			console.log( "trigger3" );
	    			if( !_.isEmpty( user ) ){
	    				
	    				req.user = user;
	    				console.dir( { user: user } );
	    				return done( null, user, { scope: 'all' } );
	    			}
	    			else return done( null, true );
	    		} ).catch( function( err ){
			    	
	    			return done( err );
			    } );
	    	}
	    	else return done( null, true );
    	} ).catch( function( err ){
	    	
    		return done( err );
	    } );
    } ) );
};