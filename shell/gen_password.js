var config = require( '../config.js' );
var models = require( '../models' )( config );
var services = require( '../services' )( config );
var bcrypt = require( 'bcrypt' );
var moment = require( 'moment-timezone' );
var _ = require( 'lodash' );

bcrypt.hash( 'ftDVJbUrI6ivtfHN2nYNks4nbusnIBL2Hp7hC4KAPrqDeWWmsZ45yqdIKvtbf8Nd8DBPo1TuX3QVusRa0sJNJGBcqBmL5emQbYugFG5qTUHmWuFg9WAbRaoUyv3JVeW8', 8, function( err, hash ) {
	  console.log( hash );
} );