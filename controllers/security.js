var config = require( '../config.js' );
var services = require( '../services' )( config );

var security_service = services.security_service;


exports.login = function( req, res, next ){

	security_service.login( req.params.identity, req.params.password ).then( function( token ){
		
		res.send( 200, { token: token } );
		next();
	} ).catch( function( err ){
		
		console.log( { login_error: err.stack } );
		
		res.send( 401 );
		next();
	} );
};

exports.check_auth = function( req, res, next ){

	security_service.check_device_auth( req.authorization.token ).then( function( authenticated ){
		
		res.send( 200, { authenticated: authenticated } );
		next();
	} ).catch( function( err ){
		
		console.log( { device_auth_error: err.stack } );
		
		res.send( 401 );
		next();
	} );
};

exports.logout = function( req, res, next ){
	
	security_service.logout( req.authorization.token ).then( function(){
		
		res.send( 200 );
		next();
	} ).catch( function( err ){
		
		console.log( { logout_error: err.stack } );
		
		res.send( 401 );
		next();
	} );
};