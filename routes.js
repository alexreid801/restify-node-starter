
module.exports = function( server, config ){
	
	var passports = config.passports;
	
	var userAuthPassport = [ passports.user.authenticate( 'bearer', { session: false } ) ];

	//Index
	var index = require( './controllers/index.js' );
	server.get( '/', index.index );
	
	//Security
	var security = require( './controllers/security.js' );
	server.post( '/login', security.login );
	server.get( '/auth', userAuthPassport, security.check_auth );
	server.post( '/logout', userAuthPassport, security.logout );
	
	//Users
	var users = require( './controllers/users.js' );
	server.get( '/users', userAuthPassport, users.index );
	
}