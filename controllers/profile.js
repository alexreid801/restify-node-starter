
var config = require( '../config.js' );
var services = require( '../services' )( config );

var profile_service = services.profile_service;


exports.index = function( req, res, next ){

	profile_service.findAll( req.user.id ).then( function( profiles ){
		
		res.send( 200, { profiles: profiles } );
	} ).catch( function( err ){
		
		console.log( { errors: [ err ] } );
		
		res.send( 401 );
	} );
};