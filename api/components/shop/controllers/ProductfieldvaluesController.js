const ShopController = require( '../ShopController' );

class ProductfieldvaluesController extends ShopController {
   #table = 'productfieldvalues';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Значения характеристик товаров' );
      
      let options = this.getFilter( req );
      this.setParam( 'table', await this.baseModel.getAll( options ) );
      this.setParam( 'page', 'values' );
      const fields = await this.helpers
         .getSelectOption( 'productfields', { name : 'filter[field_id]' } );
      this.setParam( 'fields', fields );
      if ( options.field_id ) {
         this.setParam( 'field_id', options.field_id );
         this.route.link += `?field_id=${options.field_id}`;
      }
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   postIndexAction( req, res ) {
      const url = this.setFilter( req );
      res.status( 200 ).json( { url } );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый' );
      const form = {};
      if ( req.query.field_id ) {
         this.route.link += `?field_id=${req.query.field_id}`;
         form.field_id = req.query.field_id;
      }
      const fields = await this.helpers
         .getSelectOption( 'productfields', { name : 'field_id' } );
      this.setParam( 'form', form );
      this.setParam( 'fields', fields );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      
      this.setTitle( 'Редактировать', current.title );
      this.setParam( 'form', current );
      const fields = await this.helpers
         .getSelectOption( 'productfields', { name : 'field_id' } );
      this.setParam( 'fields', fields );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      if ( !data.field_id ) {
         return res.status( 400 ).json( { message : 'Не выбрана характеристика!' } );
      }
      
      return data;
   }
}

module.exports = ProductfieldvaluesController;

