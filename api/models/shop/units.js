const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title     : { type : String, required : true, trim : true },
   order     : { type : Number, default : 0 },
   qty       : { type : Number, required : true, default : 1 },
   isDefault : { type : Boolean, default : false }
} );

const Units = mongoose.model( 'mshop_units', schema );
module.exports = Units;

module.exports.getAll = ( options ) => {
   return Units.find( options )
      .select( '-__v' )
      .sort( 'order' )
      .lean();
};
module.exports.getOne = ( id ) => {
   return Units.findOne( { _id : id } )
      .select( '-__v' )
      .lean();
};