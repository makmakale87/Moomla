const ShopController = require( '../ShopController' ),
   mongoose = require( 'mongoose' ),
   indexPageSettings = COMPONENTS + '/shop/configs/products.config.json',
   uploadDir = './assets/images/shop/products/';

class ProductsController extends ShopController {
   #table = 'products';
   
   //====================INDEX ACTION==========================
   async getIndexAction( req, res ) {
      this.setTitle( 'Список товаров' );
      
      //View settings
      this.getIndexPageSettings( indexPageSettings );
      
      //Filter options for aggregate list of categories
      let options = this.getFilter( req );
      
      const categories = await this.helpers
         .getSelectTree( 'categories', {}, 'filter[parent]' );
      const manufacturers = await this.helpers
         .getSelectOption( 'manufacturers', { name : 'filter[manufacturer]' } );
      const marks = await this.helpers
         .getSelectOption( 'productlabels', { name : 'filter[mark]' } );
      
      this.setParam( 'MShopConfig', await this.MShopConfig );
      this.setParam( 'table', await this.baseModel.getAll( options ) );
      this.setParam( 'categories', categories );
      this.setParam( 'manufacturers', manufacturers );
      this.setParam( 'marks', marks );
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
   
   //====================ADD ACTION==========================
   async getAddAction( req, res ) {
      this.setTitle( 'Новый товар' );
      await this.fillParams();
      this.getView( req, res, this.getParams() );
   }
   
   //====================EDIT ACTION==========================
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      
      this.setTitle( 'Редактирование товара', current.title );
      this.setParam( 'form', current );
      await this.fillParams();
      const parent_id = new RegExp( current.parent ? current.parent._id : '', 'i' );
      //TODO почему-то при обновлении страницы меняется их порядок
      const extra_fields = await this.helpers.getModel( 'productfields' ).getFieldsAndValues( parent_id );
      this.setParam( 'extra_fields', extra_fields );
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
      
      let isUnique = await this.helpers.checkUnique( 'products', 'alias', data.alias, id );
      if ( !isUnique ) {
         return res.status( 400 ).json( { message : 'Товар с таким псевдонимом уже существует!' } );
      }
      
      if ( data.parent == 0 ) {
         data.parent = null;
      }
      
      if ( !this._.isEmpty( req.files ) ) {
         data.image = this._.uploadPath( req.files, uploadDir );
      }
      
      if ( !data.manufacturer || data.manufacturer == 0 ) {
         data.manufacturer = null;
      }
      
      if ( !data.taxes ) {
         data.taxes = null;
      }
      
      if ( !data.units ) {
         data.units = null;
      }
      
      if ( !data.mark || data.mark == 0 ) {
         data.mark = null;
      }
      
      if ( !data.deliverytimes || data.deliverytimes == 0 ) {
         data.deliverytimes = null;
      }
      
      if ( data.unlimit == 'on' ) {
         data.unlimit = true;
      } else {
         data.unlimit = false;
      }
      
      data.new_price = formatPrice( data.new_price ) || 0;
      data.fullprice = formatPrice( data.fullprice ) || 0;
      data.price = !data.price ? data.fullprice : formatPrice( data.price );
      
      if ( data.extra_fields ) {
         data.extra_fields = JSON.parse( data.extra_fields );
         data.extra_fields.map( item => {
            item.name = convertToObjectId( item.name );
            if ( Array.isArray( item.value ) ) {
               item.value = item.value.map( val => convertToObjectId( val ) );
            } else {
               item.value = convertToObjectId( item.value );
            }
         } );
      }
      
      return data;
   }
   
   async fillParams() {
      this.setParam( 'MShopConfig', await this.MShopConfig );
      
      const parents = await this.helpers
         .getSelectTree( 'categories' );
      this.setParam( 'parents', parents );
      
      const taxes = await this.helpers
         .getModel( 'taxes' ).getAll();
      this.setParam( 'taxes', taxes );
      
      const currencies = await this.helpers
         .getModel( 'currencies' ).getAll();
      this.setParam( 'currencies', currencies );
      
      const manufacturers = await this.helpers
         .getSelectOption( 'manufacturers', { name : 'manufacturer' } );
      this.setParam( 'manufacturers', manufacturers );
      
      const marks = await this.helpers
         .getSelectOption( 'productlabels', { name : 'mark' } );
      this.setParam( 'marks', marks );
      
      const units = await this.helpers
         .getModel( 'units' ).getAll();
      this.setParam( 'units', units );
      
      const deliverytimes = await this.helpers
         .getSelectOption( 'deliverytimes', { name : 'deliverytimes' } );
      this.setParam( 'deliverytimes', deliverytimes );
   }
   
}

module.exports = ProductsController;

const convertToObjectId = ( item ) => {
   if ( mongoose.Types.ObjectId.isValid( item ) ) {
      return mongoose.Types.ObjectId( item );
   } else {
      return item;
   }
};

const formatPrice = price => {
   return parseFloat( price.replace( ',', '.' ) );
};