var _ = require( 'lodash' );
var config = require( '../config.js' );
var services = require( '../services' )( config );

var claim_service = services.claim_service;
var security_service = services.security_service;
var user_service = services.user_service;

var _this = this;

exports.index = function( req, res, next ){
	
	security_service.check_auth( req.params.token ).then( function( authenticated ){
		
		if( authenticated ){
			var body = '';
			
			body += '<input type="text" value="' + req.params.token + '" />';
		
			claim_service.create_claim().then( function( claim ){
				
				body += '<p style="color:red;">' + claim.id + '</p>';
				body += '<p style="color:blue;">' + claim.key + '</p>';
				
				res.writeHead( 200, {
					'Content-Length': Buffer.byteLength( body ),
					'Content-Type': 'text/html'
				} );
				res.write( body );
				res.end();
			} ).catch( function( err ){
				res.writeHead( 500, {
					'Content-Length':  0,
					'Content-Type': 'text/html'
				} );
				res.write();
				res.end();
				next();
			} );
		}
		else return _this.login_page( req, res, next );
	} );	
};

exports.login_page = function( req, res, next ){
	
	var body = '';
	body += '<h1 style="">Please login</h1>';
	body += '<form method="POST" action="" style="">';
	if( req.params.hasError === true ){
		body += '<p style="color:red;" >' + req.params.error + '</p>';
	}
	var identity = req.params.identity || "";
	body += 'Username: <input type="text" name="identity" style="" value="' + identity + '" />';
	body += 'Password: <input type="text" name="password" style="" value="" />';
	body += '<button type="submit" style="">Login</button>';
	body += '</form>';
	
	res.writeHead( 200, {
		'Content-Length': Buffer.byteLength( body ),
		'Content-Type': 'text/html'
	} );
	res.write( body );
	res.end();
	next();
};

exports.login = function( req, res, next ){
	security_service.login( req.params.identity, req.params.password ).then( function( token ){
		req.params.token = token;
		return _this.index( req, res, next );
	} ).catch( function( err ){
		if( typeof err != 'undefined' ){
			console.dir( err.stack );
		}
		req.params.error = "Username or password is incorrect";
		req.params.hasError = true;
		return _this.index( req, res, next );
	} );
};

exports.logout = function( req, res, next ){
	security_service.logout( req.params.token ).then( function(){
		return _this.index( req, res, next );
	} ).catch( function( err ){
		console.log( err );
		_this.index( req, res, next );
	} );
};