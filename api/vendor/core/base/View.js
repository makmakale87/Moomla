const fs = require( 'fs' );

class View {
   route;
   view;
   layout;
   
   constructor( route, layout = LAYOUT, view = '' ) {
      this.route = route;
      this.layout = layout;
      this.view = view;
   }
   
   async render( req, res, vars ) {
      res.locals.user = req.session.user ? req.session.user : null;
      res.locals.mooVersion = CONFIG.version || '';
      const fileName = `${this.route.action === 'add' ? 'edit' : (this.view ? this.view : this.route.action)}.hbs`;
      const file_view = `${this.route.views}/${fileName}`;
      
      try {
         if ( fs.existsSync( file_view ) ) {
            vars.layout = this.layout;
            res.render( file_view, vars );
         } else {
            throw new Error( `<p>Не найден вид ${file_view}</p>` );
         }
      } catch (e) {
         console.log( e.message );
      }
      
   }
}

module.exports = View;