const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title     : { type : String, required : true, trim : true },
   order     : { type : Number, default : 0 },
   tax_value : { type : String, trim : true, required : true },
   isDefault : { type : Boolean, default : false }
} );

const Taxes = mongoose.model( 'mshop_taxes', schema );
module.exports = Taxes;

module.exports.getAll = ( options ) => {
   return Taxes.find( options )
      .select( '-__v' )
      .sort( 'order' )
      .lean();
};
module.exports.getOne = ( id ) => {
   return Taxes.findOne( { _id : id } )
      .select( '-__v' )
      .lean();
};