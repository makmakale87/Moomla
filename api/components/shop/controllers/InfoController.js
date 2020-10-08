const ShopController = require( '../ShopController' );

class InfoController extends ShopController {
   
   async getIndexAction( req, res, next ) {
      this.setTitle( 'О нас' );
      this.turnOffToolbar();
      this.getView( req, res, this.getParams() );
   }
}

module.exports = InfoController;