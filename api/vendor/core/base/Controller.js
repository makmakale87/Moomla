const View = require( './View' );

class Controller {
   route;
   view;
   layout;
   
   constructor( route ) {
      this.route = route;
   }
   
   getView( req, res, vars = {} ) {
      const vObj = new View( this.route, this.layout, this.view );
      vObj.render( req, res, vars );
   }
}

module.exports = Controller;