const express = require( 'express' ),
   path = require( 'path' ),
   hbs = require( 'express-handlebars' ),
   config = require( path.join( ROOT, 'configuration' ) );

module.exports = ( app ) => {
   const templates = path.join( TEMPLATES, config.defaultTmpl );
   /* Setup View Engine To Use Handlebars */
   app.engine( 'hbs', hbs( {
      layoutsDir    : templates,
      partialsDir   : path.join( templates, 'partials' ),
      defaultLayout : 'index',
      helpers       : require( './helpers' ),
      extname       : 'hbs'
   } ) );
   
   app.set( 'view engine', 'hbs' );
   app.set( 'views', templates );
   app.set( 'view options', config.viewOptions );
   
   /* Static paths for styles, scripts, etc.*/
   app.use( '/assets', [
      express.static( './node_modules/@fortawesome/fontawesome-free/' ),
      express.static( './node_modules/bootstrap/dist/' ),
      express.static( './node_modules/spectrum-colorpicker2/dist' ),
      express.static( path.join( ROOT, 'assets' ) ),
      express.static( TEMPLATES )
   ] );
   app.use( '/shop', [
      express.static( path.join( COMPONENTS, 'shop' ) )
   ] );
};