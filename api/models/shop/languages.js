const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title     : { type : String, required : true, trim : true },
   order     : { type : Number, default : 0 },
   language  : { type : String, required : true, trim : true },
   status    : {
      type    : String,
      enum    : [ 'public', 'unpublic' ],
      default : 'public'
   },
   isDefault : { type : Boolean, default : false }
} );

const Model = mongoose.model( 'mshop_languages', schema );
module.exports = Model;

module.exports.getAll = ( options ) => {
   return Model.find( options )
      .select( '-__v' )
      .sort( 'order' )
      .lean();
};
module.exports.getOne = ( id ) => {
   return Model.findOne( { _id : id } )
      .select( '-__v' )
      .lean();
};