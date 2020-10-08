const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title             : { type : String, required : true, trim : true },
   order             : { type : Number, default : 0 },
   isDefault         : { type : Boolean, default : false },
   currency_code     : { type : String, trim : true, unique : true, required : true },
   currency_code_num : { type : String, trim : true },
   currency_value    : { type : String, trim : true, required : true, default : 1 },
   multiplicity      : { type : String, default : 1 }
} );

const Model = mongoose.model( 'mshop_currencies', schema );
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