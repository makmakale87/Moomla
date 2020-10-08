const ShopController = require( '../ShopController' ),
   indexPageSettings = COMPONENTS + '/shop/configs/categories.config.json',
   uploadDir = './assets/images/shop/categories/';

class CategoriesController extends ShopController {
   #table = 'categories';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Категории' );
      
      //View settings
      this.getIndexPageSettings( indexPageSettings );
      
      //Filter options for aggregate list of categories
      let options = this.getFilter( req );
      const categories = await this.baseModel.getTree( options );
      this.setParam( this.#table, categories );
      
      //*Render*//
      this.getView( req, res, this.getParams() );
   }
   
   postIndexAction( req, res ) {
      const url = this.setFilter( req );
      res.status( 200 ).json( { url } );
   }
   
   postSettingsAction( req, res ) {
      this.setIndexPageSettings( req, indexPageSettings );
      res.redirect( this.baseLink );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новая категория' );
      this.setParam( 'parents',
         await this.helpers.getSelectTree( this.#table ) );
      
      //*Render*//
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      //
      this.setTitle( 'Редактирование категории', current.title );
      this.setParam( 'form', current );
      this.setParam( 'parents',
         await this.helpers.getSelectTree( this.#table ) );
      
      //*Render*//
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
      
      let isUnique = await this.helpers.checkUnique( this.#table, 'alias', data.alias, id );
      if ( !isUnique ) {
         return res.status( 400 ).json( { message : 'Категория с таким псевдонимом уже существует!' } );
      }
      
      if ( data.parent == 0 ) {
         data.parent = null;
      }
      
      if ( !this._.isEmpty( req.files ) ) {
         data.image = this._.uploadPath( req.files, uploadDir );
      }
      
      return data;
   }
}

module.exports = CategoriesController;



