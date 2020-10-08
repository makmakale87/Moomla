const ShopController = require( '../ShopController' );

class OrdersController extends ShopController {
   async getIndexAction( req, res ) {
      this.setTitle( 'Заказы' );
      this.turnOffToolbar();
      this.getView( req, res, this.getParams() );
   }
}

module.exports = OrdersController;