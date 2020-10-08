const AdminController = require( '../AdminController' ),
   helpers = require( './helpers' ),
   MShopConfig = helpers
   .getModel( 'config' )
   .findOne()
   .select( '-_id -__v' )
   .lean(),
   Sidebar = require( LIBRARIES + '/system/sidebar/sidebar' );

class ShopController extends AdminController {
   
   constructor( route ) {
      super( route );
      this.helpers = helpers;
      this.baseModel = this.helpers.getModel( this.route.controller );
      this.MShopConfig = MShopConfig;
      this.sidebar = new Sidebar( this.route );
   }
   
   async getIndexAction( req, res ) {
      this.setTitle( 'MooShopping' );
      this.getView( req, res, this.getParams() );
   }
}

module.exports = ShopController;