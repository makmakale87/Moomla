const ShopController = require( '../ShopController' );

class ProductfieldsController extends ShopController {
   #table = 'productfields';
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Характеристики товаров' );
      let options = this.getFilter( req );
      this.setParam( 'groups', await this.helpers
         .getSelectOption( 'productgroups', { name : 'filter[group]' } ) );
      this.setParam( 'table', await this.baseModel.getAll( options ) );
      this.setParam( 'page', 'fields' );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   postIndexAction( req, res ) {
      const url = this.setFilter( req );
      res.status( 200 ).json( { url } );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый' );
      const cats = await this.helpers
         .getMultiSelectTree( 'categories', {
            name            : 'cats',
            select_id       : 'category_id',
            multiple        : true,
            size            : 10,
            disable_default : true
         } );
      this.setParam( 'cats', cats );
      const units = await this.helpers.getSelectOption( 'units', { name : 'unit' } );
      this.setParam( 'units', units );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams() );
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await this.helpers.getItem( this.#table, id );
      const cats = await this.helpers
         .getMultiSelectTree( 'categories', {
            name            : 'cats',
            select_id       : 'category_id',
            multiple        : true,
            size            : 10,
            disable_default : true
         } );
      //
      this.setTitle( 'Редактировать', current.title );
      this.setParam( 'form', current );
      this.setParam( 'cats', cats );
      const units = await this.helpers.getSelectOption( 'units', { name : 'unit' } );
      this.setParam( 'units', units );
      this.setParam( 'sidebar', await this.sidebar.render() );
      this.getView( req, res, this.getParams( id ) );
   }
   
   //Groups
   async getGroupsAction( req, res ) {
      const groups = await this.helpers.getModel( 'productgroups' ).getAll();
      res.status( 200 ).json( groups );
   }
   
   async postGroupsAction( req, res ) {
      const { title } = req.body;
      const Model = this.helpers.getModel( 'productgroups' );
      const group = new Model( { title } );
      try {
         await group.save();
         const groups = await Model.getAll();
         res.status( 201 ).json( groups );
      } catch (e) {
         console.log( e.message );
      }
   }
   
   async putGroupsAction( req, res ) {
      const Model = this.helpers.getModel( 'productgroups' );
      
      try {
         const { id, title } = req.body;
         await Model.updateOne( { _id : id }, { title : title } );
         const groups = await Model.getAll();
         res.status( 201 ).json( groups );
      } catch (e) {
         console.log( e.message );
      }
   }
   
   async deleteGroupsAction( req, res ) {
      const Model = this.helpers.getModel( 'productgroups' );
      await Model.deleteOne( req.body );
      const groups = await Model.getAll();
      res.status( 200 ).json( groups );
   }
   
   //
   
   async validate( req, res ) {
      let data = req.body;
      
      if ( !data.title ) {
         return res.status( 400 ).json( { message : 'Заголовок обязателен к заполнению!' } );
      }
      if ( data.allcats == 0 ) {
         data.cats = [];
      }
      if ( !data.group || data.group == 0 ) {
         data.group = null;
      }
      if ( !data.unit || data.unit == 0 ) {
         data.unit = null;
      }
      
      return data;
   }
}

module.exports = ProductfieldsController;

