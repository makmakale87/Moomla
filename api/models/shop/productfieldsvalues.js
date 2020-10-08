const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title    : { type : String, required : true, trim : true },
   field_id : { type : Schema.Types.ObjectId, ref : 'mshop_products_extra_fields' },
   order    : { type : Number, default : 0 }
} );

const Model = mongoose.model( 'mshop_products_extra_field_values', schema );
module.exports = Model;

module.exports.getAll = ( options ) => {
   return Model.find( options ).lean().sort( 'order' ).select( '-__v' ).populate( 'field_id' );
};
module.exports.getOne = ( id ) => {
   return Model.findOne( { _id : id } ).lean().select( '-__v' );
};