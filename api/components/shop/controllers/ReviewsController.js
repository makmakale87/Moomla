const ShopController = require( '../ShopController' );

class ReviewsController extends ShopController {
   async getIndexAction( req, res ) {
      this.setTitle( 'Отзывы' );
      this.turnOffToolbar();
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
}

module.exports = ReviewsController;