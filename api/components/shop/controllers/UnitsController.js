const ShopController = require( '../ShopController' );

class UnitsController extends ShopController {
   #table = 'units';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Единицы измерения' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая Единица измерения' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      //
      this.setTitle( 'Изменить Единицу измерения', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      
      if ( !data.qty || isNaN( parseFloat( data.qty ) ) ) {
         return res.status( 400 ).json( { message : 'Базовое количество обязателено к заполнению!' } );
      }
      
      return data;
   }
}

module.exports = UnitsController;

