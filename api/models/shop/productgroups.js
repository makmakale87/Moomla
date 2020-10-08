const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title       : { type : String, required : true, trim : true },
   order       : { type : Number, default : 0 },
   description : { type : String }
} );

const Model = mongoose.model( 'mshop_products_extra_field_groups', schema );
module.exports = Model;

module.exports.getAll = ( options ) => {
   return Model.find( options ).lean().sort( 'order' ).select( '-__v' );
};
module.exports.getOne = ( id ) => {
   return Model.findOne( { _id : id } ).lean().select( '-__v' );
};