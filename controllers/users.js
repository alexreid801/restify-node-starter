var config = require( '../config.js' );
var services = require( '../services' )( config );

var user_service = services.user_service;


exports.index = function( req, res, next ){

	user_service.findAll().then( function( users ){
		
		res.send( 200, { users: users } );
	} ).catch( function( err ){
		
		console.log( { errors: [err] } );
		
		res.send( 401 );
	} );
};