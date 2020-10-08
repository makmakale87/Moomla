const ShopController = require( '../ShopController' );

class PaymentsController extends ShopController {
   #table = 'payments';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Список оплат' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая оплата' );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const id = req.query.id;
      const current = await this.helpers.getItem( this.#table, id );
      
      this.setTitle( 'Редактирование оплаты', current.title );
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

module.exports = PaymentsController;