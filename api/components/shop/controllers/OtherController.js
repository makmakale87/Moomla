const ShopController = require( '../ShopController' );

class OtherController extends ShopController {
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Опции' );
      const config = require( '../configs/other.config' );
      this.setParam( 'ops', this.baseModel( await this.MShopConfig, config ) );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
}

module.exports = OtherController;