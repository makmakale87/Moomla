const ShopController = require( '../ShopController' );

class DeliverytimesController extends ShopController {
   #table = 'deliverytimes';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Сроки поставки' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый "Срок поставки"' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      //
      this.setTitle( 'Изменить "Срок поставки"', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res, id = '' ) {
      let data = req.body;
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      return data;
   }
}

module.exports = DeliverytimesController;