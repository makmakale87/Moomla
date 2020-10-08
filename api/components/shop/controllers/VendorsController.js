const ShopController = require( '../ShopController' );

class VendorsController extends ShopController {
   async getIndexAction( req, res ) {
      this.setTitle( 'Продавцы' );
      this.turnOffToolbar();
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
}

module.exports = VendorsController;