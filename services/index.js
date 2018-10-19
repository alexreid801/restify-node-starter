var fs = require( 'fs' );
var Sequelize = require( 'sequelize' );
var path = require( 'path' );
var _ = require( 'lodash' );

var Op = Sequelize.Op;

module.exports = function( config ){
	
	var services = {};
	
	fs.readdirSync( __dirname )
		.filter( function( file ){
			return ( ( file.indexOf( '.' ) !== 0 ) && ( file !== 'index.js' ) && ( file.slice( -3 ) == '.js' ) );
		} )
		.forEach( function( file ){
			var service = require( path.join( __dirname, file ) );
			services[ file.slice( 0, -3 ) + '_service' ] = service;
		} );
	return services;
};