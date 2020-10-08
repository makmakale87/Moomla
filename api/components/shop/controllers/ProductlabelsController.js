const ShopController = require( '../ShopController' ),
   uploadDir = './assets/images/shop/labels/';

class ProductlabelsController extends ShopController {
   #table = 'productlabels';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Метки товара' );
      this.setParam( 'table', await this.baseModel.getAll() );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая метка товара' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      
      this.setTitle( 'Изменить метку товара', current.title );
      this.setParam( 'form', current );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      
      if ( !this._.isEmpty( req.files ) ) {
         data.image = this._.uploadPath( req.files, uploadDir );
      }
      
      return data;
   }
}

module.exports = ProductlabelsController;