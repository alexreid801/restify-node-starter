var crypto = require( 'crypto' );
var bcrypt = require( 'bcrypt' );
var config = require( '../config.js' );
var models = require( '../models' )( config );

var Claims = models.security_db.Claims;

exports.create_claim = function(){
	return new Promise( function( resolve, reject ){
		
		var key = crypto.randomBytes( 128 ).toString( 'hex' );
		
		bcrypt.hash( key, 8, function( err, hash ) {
			
			if( !!err ){
				reject( err );
			}
			
			Claims.create( { claim_key_hash: hash } ).then( function( claim ){
				
				resolve( { id: claim.id, key: key } );
				
			} ).catch( function( err ){
				
				reject( err );
			} );
		} );
	} );
};
	
exports.check_claim = function( type, id, key ){
	
	return Claims.findById( id ).then( function( claim ){
		
		return bcrypt.compare( key, claim );
	} );
};