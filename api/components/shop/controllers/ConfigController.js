const ShopController = require( '../ShopController' );

class ConfigController extends ShopController {
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Конфигурация магазина' );
      this.turnOffToolbar();
      //defaultConfig(); //on first start
      
      const form = await this.baseModel.findOne().lean();
      
      this.setParam( 'form', form );
      this.getView( req, res, this.getParams() );
   }
   
   async postIndexAction( req, res ) {
      try {
         const { name, value } = req.body;
         
         const config = await this.baseModel.findOne().lean();
         config[name] = value;
         await this.baseModel.updateOne( config );
      } catch (e) {
         console.log( e.message );
      }
   }
   
   async defaultConfig() {
      const count = await this.baseModel.countDocuments();
      
      if ( count === 0 ) {
         try {
            const model = new this.baseModel( {} );
            await model.save();
         } catch (e) {
            console.log( e.message );
         }
      }
   }
}

module.exports = ConfigController;