var convict = require( 'convict' );
var _ = require( 'lodash' );

// Define a schema
var config = convict( {
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  name: {
	doc: "The name of the application.",
	format: String,
	default: "My Application"
  },
  version: {
    doc: "The version of the application",
    format: String,
    default: "0.0.1"
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080
  },
  databases: {
    doc: "The databases with connection properties",
    format: function check ( databases ) {
      var dbconfig = convict( {
  	    host: {
  		  doc: "Database host name/IP",
  		  format: '*',
  		  default: '127.0.0.1'
  		},
  		name: {
  		  doc: "Database name",
  		  format: String,
  		  default: 'dbname'
  		},
  		username: {
  		  doc: "Database username",
  		  format: String,
  		  default: 'dbuser'
  		},
  		password: {
  		  doc: "Database password",
  		  format: String,
  		  default: 'dbpass'
  		},
  	    dialect: {
  		  doc: "The dialect of the database",
  		  format: [ 'mysql', 'postgres' ],
  		  default: 'mysql'
  	    },
  	    force_sync: {
  	      doc: "Set to true will re-sync database",
  	      format: Boolean,
  	      default: false
  	    }
  	  } );
      dbconfig.validate( { allowed: 'strict' } );
      _.forEach( databases, function( database ){
    	  dbconfig.load( database );
    	  _.forOwn( dbconfig.getSchema().properties, function( value, key ){
    		 //console.log( config.get( 'databases' ) ) != database[ key ];
    	  } );
      } );
    },
    default: []
  },
  secrets: {
	  doc: "The secrets in the application",
	  format: Object,
	  default: {
		  "token": "",
		  "hashId": ""
	  }
  }
} );

// Load environment dependent configuration
var env = config.get( 'env' );
config.loadFile( './configs/' + env + '.json' );

// Perform validation
config.validate( { allowed: 'strict' } );

module.exports = config;