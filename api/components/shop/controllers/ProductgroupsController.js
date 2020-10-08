const ShopController = require( '../ShopController' );

class ProductgroupsController extends ShopController {
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Группы характеристик' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'page', 'groups' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая группа характеристик' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.baseModel.getOne( id );

      this.setTitle( 'Изменить группу характеристик', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      
      return data;
   }
}

module.exports = ProductgroupsController;