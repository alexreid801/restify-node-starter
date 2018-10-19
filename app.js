var restify = require( 'restify' );
var Promise = require( 'promise' );
var _ = require( 'lodash' );
var config = require( './config.js' );

var env = config.get( 'env' );

console.log( 'Starting in %s mode', env );

var server = restify.createServer( {
	name: config.get( 'name' ),
	version: config.get( 'version' )
} );

server.use( restify.plugins.acceptParser( server.acceptable ) );
server.use( restify.plugins.queryParser( { mapParams: true } ) );
server.use( restify.plugins.bodyParser( { mapParams: true } ) );
server.use( restify.plugins.authorizationParser() );
//server.use( restify.CORS() );
server.use( restify.plugins.fullResponse() );

var dbs = [];
_.forEach( require( './models' )( config ), function( model ){
	dbs.push( model.sequelize.sync( { force: model.dbconfig.force_sync } ) );
} );

Promise.all( dbs ).then( function(){ 
	 server.listen( config.get( 'port' ), function(){
		 var name = config.get( 'name' );
		 var location = 'http://' + config.get( 'ip' ) + ':' + config.get( 'port' );
		 console.log( '%s listening at %s', name, location );
	 } );
} );

config.passports = {
		device: require( 'passport' ),
		user: require( 'passport' )
};
require( './passports/user.js' )( config );
require( './passports/device.js' )( config );

require( './routes.js' )( server, config );