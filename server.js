require( './api/includes/defines.js' );

const express = require( 'express' ),
   Router = require( './api/vendor/core/Router' );

//Server configuration
app = express();
require( './api/vendor/config/server.cfg' )( app );

//Routes
const R = new Router( app );
R.dispatch();

//Server start
app.listen( CONFIG.port, () => {
   console.log( `Server listening on port: ${CONFIG.port}` );
} );

