const ShopController = require( '../ShopController' ),
   uploadDir = './assets/images/shop/manufacturers/';

class ManufacturersController extends ShopController {
   #table = 'manufacturers';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Список производителей' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый производитель' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      //
      this.setTitle( 'Редактировать производителя', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res, id = '' ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      
      if ( !data.alias ) {
         data.alias = this._.makeAlias( data.title ).toLowerCase();
      }
      
      let isUnique = await this.helpers.checkUnique( 'manufacturers', 'alias', data.alias, id );
      if ( !isUnique ) {
         return res.status( 400 ).json( { message : 'Производитель с таким псевдонимом уже существует!' } );
      }
      
      if ( !this._.isEmpty( req.files ) ) {
         data.image = this._.uploadPath( req.files, uploadDir );
      }
      
      return data;
   }
}

module.exports = ManufacturersController;