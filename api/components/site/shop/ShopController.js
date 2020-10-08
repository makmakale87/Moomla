const helpers = require( '../../shop/helpers' );

class ShopController {
   
   async getProductsAction( req, res ) {
      const cats = req.query.filterCategories || [];
      const manuf = req.query.filterManufacturers || [];
      
      let query = {
         status: {$eq:'public'}
      };
      if ( cats && cats.length ) {
         query.parent = { $in : cats };
      }
      if ( manuf && manuf.length ) {
         query.manufacturer = { $in : manuf };
      }
      
      const products = await helpers.getModel( 'products' ).getAll( query );
      res.json( products );
   }
   
   async getCategoriesAction( req, res ) {
      const categories = await helpers.getModel( 'categories' ).siteFilterCategories();
      res.json( categories );
   }
   
   async getProductAction( req, res ) {
      const { alias } = req.query;
      const _product = await helpers.getModel( 'products' ).productDetail( alias );
      const product = _product[0];
      res.json( product );
   }
   
   async getConfigAction( req, res ) {
      const config = await helpers.getModel( 'config' )
         .findOne()
         .select( '-_id -__v' )
         .lean();
      res.json( config );
   }
   
   async getManufacturersAction( req, res ) {
      const manufacturers = await helpers.getModel( 'manufacturers' ).getAll();
      res.json( manufacturers );
   }
}

module.exports = ShopController;