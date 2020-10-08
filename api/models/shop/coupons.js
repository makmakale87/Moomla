const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title             : { type : String, required : true, trim : true },
   order             : { type : Number, default : 0 },
   coupon_type       : { type : Number, default : 0 },
   coupon_value      : { type : String },
   coupon_start_date : { type : Date },
   coupon_end_date   : { type : Date },
   end_after_use     : { type : Boolean, default : false }
   
} );

const Model = mongoose.model( 'mshop_coupons', schema );
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