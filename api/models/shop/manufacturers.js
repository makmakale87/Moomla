const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title             : { type : String, required : true, trim : true },
   alias             : { type : String, trim : true, unique : true },
   short_description : { type : String, trim : true },
   description       : { type : String },
   meta_title        : { type : String, trim : true },
   meta_description  : { type : String, trim : true },
   meta_keywords     : { type : String, trim : true },
   link              : { type : String, trim : true },
   status            : {
      type    : String,
      enum    : [ 'public', 'unpublic' ],
      default : 'public'
   },
   image             : { type : String },
   img_position      : { type : String },
   order             : { type : Number, default : 0 }
} );

const Model = mongoose.model( 'mshop_manufacturers', schema );
module.exports = Model;

module.exports.getAll = ( options ) => {

   return Model.aggregate( [ {
      $graphLookup : {
         from             : 'mshop_products',
         startWith        : '$_id',
         connectFromField : '_id',
         connectToField   : 'manufacturer',
         as               : 'products'
      }
   }, {
      $project : { __v : 0 }
   }, {
      $sort : { order : 1 }
   } ] );
};

module.exports.getOne = ( id ) => {
   return Model.findOne( { _id : id } )
      .select( '-__v' )
      .lean();
};