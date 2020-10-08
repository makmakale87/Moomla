const ShopController = require( '../ShopController' );

class CurrenciesController extends ShopController {
   #table = 'currencies';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Список валют' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая валюта' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      
      this.setTitle( 'Редактирование валюты', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      
      if ( !data.currency_code ) {
         return res.status( 400 ).json( { message : 'Код обязателен к заполнению!' } );
      }
      
      if ( !data.currency_value ) {
         return res.status( 400 ).json( { message : 'Обменный курс обязателен к заполнению!' } );
      }
      
      let currency_value = data.currency_value.replace( ',', '.' );
      currency_value = parseFloat( currency_value );
      data.currency_value = currency_value ? currency_value : 1;
      
      return data;
   }
}

module.exports = CurrenciesController;

