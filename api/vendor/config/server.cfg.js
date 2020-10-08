const config = require( ROOT + '/configuration' ),
   express = require( 'express' ),
   db = require( './db' ),
   favicon = require( 'serve-favicon' ),
   sessions = require( './sessions.cfg' ),
   cors = require( 'cors' ),
   fileUpload = require( 'express-fileupload' ),
   viewEngine = require( './view-engine' ),
   compression = require( 'compression' ),
   path = require( 'path' );

module.exports = ( app ) => {
   app.use( express.json() );
   app.use( express.urlencoded( { extended : true } ) );
   app.use( compression() );
   app.use( cors() );
   app.use( favicon( path.join( TEMPLATES, config.defaultTmpl, 'favicon.png' ) ) );
   
   /* Sessions config */
   sessions( app );
   
   /* View Engine */
   viewEngine( app );
   
   /* File Upload Middleware*/
   app.use( fileUpload() );
   
   app.use( ( req, res, next ) => {
      res.locals.template = config.defaultTmpl;
      res.locals.currentyear = new Date().getFullYear();
      
      next();
   } );
   
   //Database connection
   db.connectDb( app );
};