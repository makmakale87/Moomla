const path = require( 'path' );
const fs = require( 'fs' );
const { isAuth } = require( '../../libraries/functions' );

class Router {
   #route = {};
   #prefix = '\\api\\';
   #mainpage = 'cpanel';
   #root = ADMIN;
   #templates = TEMPLATES;
   
   constructor( app ) {
      this.app = app;
   }
   
   setRoute( url, query ) {
      let urlArray = this.parseUrl( url ).slice( -2 );
      let pagePath = this.parseUrl( url ).join( '/' );
      
      let route = {};
      this.#route.prefix = this.#prefix;
      
      if ( urlArray.length == 0 ) {
         route.path = path.join( this.#root, 'components', this.#mainpage );
         route.controller = this.#mainpage;
      } else {
         route.path = path.join( this.#root, 'components', pagePath );
         route.controller = urlArray[urlArray.length - 1];
      }
      route.action = (!query || !query.task) ? 'index' : query.task.toLowerCase();
      route.link = url;
      route.views = path.join( this.#templates, 'views', (!pagePath ? this.#mainpage : pagePath) );
      
      this.#route = route;
   }
   
   getRoute( req, res, next ) {
      let $contrName = this.upperCamelCase( this.#route['controller'] ) + 'Controller';
      let $controller = path.join( this.#route.path, $contrName );
      let $controllerAlt = path.join( this.#route.path, '..', 'controllers', $contrName );
      
      let controller;
      if ( fs.existsSync( $controller + '.js' ) ) {
         controller = require( $controller );
      } else if ( fs.existsSync( $controllerAlt + '.js' ) ) {
         controller = require( $controllerAlt );
      } else {
         throw new Error( `Контроллер <b>${$controller}</b> не найден` );
      }
      
      let $cObj = new controller( this.#route );
      let $action = req.method.toLowerCase() + this.upperCamelCase( this.#route['action'] ) + 'Action';
      
      if ( $cObj[$action] ) {
         $cObj[$action]( req, res, next );
      } else {
         throw new Error( `Метод <b>${$controller}::${$action}</b> не найден` );
      }
   }
   
   dispatch() {
      this.app.get( '/', ( req, res, next ) => {
         res.redirect( 'http://localhost:8080' );
      } );
      this.app.get( '/admin', ( req, res, next ) => {
         this.setRoute( req._parsedUrl.pathname, req.query );
         this.getRoute( req, res, next );
      } );
      this.app.all( '/admin/*', isAuth, ( req, res, next ) => {
         next();
      } );
      this.app.all( '/*', ( req, res, next ) => {
         this.setRoute( req._parsedUrl.pathname, req.query );
         this.getRoute( req, res, next );
      } );
      
      //Error Handler
      this.app.use( ( req, res, next ) => {
         const error = new Error( 'Страница не найдена' );
         error.statusCode = 404;
         next( error );
      } );
      this.app.use( ( error, req, res, next ) => {
         res.status( error.statusCode || 500 );
         res.render( 'errors', {
            // layout : false,
            error : error,
            debug : CONFIG.debug
         } );
      } );
   }
   
   parseUrl( url ) {
      return url.split( '/' ).filter( item => !!item && item !== 'admin' );
   }
   
   lowerCamelCase( str ) {
      return str.charAt( 0 ).toLowerCase() + str.substr( 1 );
   }
   
   upperCamelCase( str ) {
      return str.charAt( 0 ).toUpperCase() + str.substr( 1 );
   }
   
}

module.exports = Router;