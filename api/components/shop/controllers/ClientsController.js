const ShopController = require( '../ShopController' );

class ClientsController extends ShopController {
   async getIndexAction( req, res ) {
      this.setTitle( 'Клиенты' );
      this.turnOffToolbar();
      this.getView( req, res, this.getParams() );
   }
}

module.exports = ClientsController;