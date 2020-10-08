const ShopController = require( '../ShopController' );

class OrderstatusController extends ShopController {
   #table = 'orderstatus';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Список статусов заказа' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый статус заказа' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      //
      this.setTitle( 'Редактировать статус заказа', current.title );
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

module.exports = OrderstatusController;