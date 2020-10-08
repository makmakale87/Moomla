const
   Select = require( LIBRARIES + '/system/select/Select' ),
   db = require( './models' );

module.exports = {
   
   getModel : ( name ) => {
      return db[name];
   },
   
   getSelectOption : async ( model, selectOptions = {}, modelOptions = {} ) => {
      let list = await db[model].getAll( modelOptions );
      return new Select( list, selectOptions );
   },
   
   getSelectTree : async ( model, options = {}, name = 'parent' ) => {
      let list = await db[model].getTree( options );
      return new Select( await list, { name } );
   },
   
   getMultiSelectTree : async ( model, options = {} ) => {
      let list = await db[model].getTree();
      return new Select( await list, options );
   },
   
   getItem : async ( model, id ) => {
      return db[model].getOne( id );
   },
   
   checkUnique : async ( model, field, value, id = '' ) => {
      const ops = {};
      ops[field] = value;
      if ( id ) ops._id = { $ne : id };
      
      const $model = await db[model]
         .findOne( ops )
         .select( field ).lean();
      
      return !$model;
      
   }
   
};