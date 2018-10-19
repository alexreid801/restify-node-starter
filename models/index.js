var fs = require( 'fs' );
var Sequelize = require( 'sequelize' );
var path = require( 'path' );
var _ = require( 'lodash' );

var Op = Sequelize.Op;

module.exports = function( config ){
	
	var models = {};
	var databases = config.get( 'databases' );
	
	fs.readdirSync(  __dirname )
	.filter( function( file ){
		return file !== 'index.js';
	} )
	.forEach( function( fileName ){
		var filePath = path.join( __dirname, fileName );
		
		var dbconfig = _.find( databases, [ 'name', fileName ] );
		
		if( typeof dbconfig == 'undefined' ){
			console.log( 'Could not find database configuration for model "%s".  Model loading skipped..', fileName );
			return true;
		}
	
		var sequelize = new Sequelize(
			dbconfig.name,
			dbconfig.username,
			dbconfig.password,
			{
				host: dbconfig.host,
				dialect: dbconfig.dialect,
				define: {
					underscored: true,
					charset: 'utf8',
					collate: 'utf8_general_ci',
				},
				logging: false,
				operatorsAliases: {
					$and: Op.and,
					$or: Op.or,
					$eq: Op.eq,
					$gt: Op.gt,
					$lt: Op.lt,
					$lte: Op.lte,
					$like: Op.like
			    },
				maxConcurrentQueries: 200,
				pool: { maxConnections: 10, maxIdleTime: 30 }
			}
		);
		
		var db = {};
		
		fs.readdirSync(  filePath )
			.filter( function( file ){
				return ( ( file.indexOf( '.' ) !== 0 ) && ( file !== 'index.js' ) && ( file.slice( -3 ) == '.js' ) );
			} )
			.forEach( function( file ){
				var model = sequelize.import( path.join( filePath, file ) );
				db[ model.name ] = model;
			} );
		
		Object.keys( db ).forEach( function( modelName ){
			if( db[ modelName ].options.hasOwnProperty( 'associate' ) ){
				db[ modelName ].options.associate( db );
			}
		} );
		models[ dbconfig.name ] = _.extend( {
			dbconfig: dbconfig,
			sequelize: sequelize,
			Sequelize: Sequelize,
		}, db );
	} );
	return models;
};