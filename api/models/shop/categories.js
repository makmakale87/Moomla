const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const { getTree } = require( LIBRARIES + '/functions' );

const schema = new Schema( {
   title             : { type : String, required : [ true, 'Заголовок обязателен!' ], trim : true },
   alias             : { type : String, trim : true, unique : true },
   short_description : { type : String, trim : true },
   description       : { type : String },
   meta_title        : { type : String, trim : true },
   meta_description  : { type : String, trim : true },
   meta_keywords     : { type : String, trim : true },
   status            : {
      type    : String,
      enum    : [ 'public', 'unpublic' ],
      default : 'public'
   },
   products_on_page  : { type : Number },
   parent            : { type : Schema.Types.ObjectId, ref : 'mshop_categories' },
   image             : { type : String },
   img_position      : { type : String },
   order             : { type : Number, default : 0 }
} );

const Categories = mongoose.model( 'mshop_categories', schema );
module.exports = Categories;

module.exports.getAll = ( options = {} ) => {
   return Categories.find( options )
      .select( '-__v' )
      .populate( 'parent' )
      .sort( 'order' )
      .lean();
};

module.exports.getTree = ( options = {} ) => {
   const search = new RegExp( (options && options.title ? options.title : ''), 'i' );
   const dataset = Categories.aggregate( [ {
      $match : {
         $or : [
            { 'title' : search }
         ]
      }
   }, {
      $sort : {
         order : 1
      }
   } ] );
   return getTree( dataset );
};

module.exports.getOne = ( id ) => {
   return Categories.findOne( { _id : id } )
      .select( '-__v' )
      .populate( 'parent' )
      .lean();
};

module.exports.siteFilterCategories = () => {
   return Categories.aggregate( [ {
      $graphLookup : {
         from             : 'mshop_products',
         startWith        : '$_id',
         connectFromField : '_id',
         connectToField   : 'parent',
         as               : 'products'
      }
   }, {
      $group : {
         _id          : {
            _id   : '$_id',
            title : '$title',
            order : '$order'
         },
         productCount : { $sum : { $size : '$products' } }
      }
   }, {
      $match : { productCount : { $gt : 0 } }
   }, {
      $addFields : { '_id.count' : '$productCount' }
   }, {
      $replaceRoot : { newRoot : '$_id' }
   }, {
      $sort : { order : 1 }
   } ] );
};