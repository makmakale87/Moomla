const path = require( 'path' );

global.ROOT = path.join( __dirname, '..', '..' );
global.CONFIG = require( path.resolve( ROOT, 'configuration.js' ) );
global.ADMIN = path.join( ROOT, 'api' );
global.CORE = path.join( ADMIN, 'vendor/core' );
global.COMPONENTS = path.join( ADMIN, 'components' );
global.MODELS = path.join( ADMIN, 'models' );
global.LIBRARIES = path.join( ADMIN, 'libraries' );
global.TEMPLATES = path.join( ADMIN, 'templates' );
global.LAYOUT = 'index';

