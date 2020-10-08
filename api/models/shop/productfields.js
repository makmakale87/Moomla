const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   title       : { type : String, required : true, trim : true },
   description : { type : String, trim : true },
   allcats     : { type : Number, default : 0 },
   cats        : { type : Array },
   type        : { type : Number, default : 0 },
   group       : { type : Schema.Types.ObjectId, ref : 'mshop_products_extra_field_groups' },
   status      : {
      type    : String,
      enum    : [ 'public', 'unpublic' ],
      default : 'public'
   },
   unit        : { type : Schema.Types.ObjectId, ref : 'mshop_units' },
   order       : { type : Number, default : 0 }
} );

const Model = mongoose.model( 'mshop_products_extra_fields', schema );
module.exports = Model;

module.exports.getAll = ( options ) => {
   return Model.find( options )
      .select( '-__v' )
      .lean().sort( 'order' )
      .populate( 'group' )
      .populate( 'unit' );
};
module.exports.getOne = ( id ) => {
   return Model.findOne( { _id : id } )
      .select( '-__v' )
      .lean()
      .populate( 'group' )
      .populate( 'unit' );
};
module.exports.getFieldsAndValues = ( id ) => {
   let ids = [];
   if ( id ) ids.push( id );
   
   return Model.aggregate( [ {
      $match : {
         status : 'public',
         $or    : [
            { allcats : 0 },
            { cats : { $in : ids } }
         ]
      }
   }, {
      $lookup : {
         from         : 'mshop_products_extra_field_groups',
         localField   : 'group',
         foreignField : '_id',
         as           : 'groups'
      }
   }, {
      $lookup : {
         from         : 'mshop_products_extra_field_values',
         localField   : '_id',
         foreignField : 'field_id',
         as           : 'values'
      }
   }, {
      $lookup : {
         from         : 'mshop_units',
         localField   : 'unit',
         foreignField : '_id',
         as           : 'unit'
      }
   }, {
      $unwind : {
         path                       : '$unit',
         preserveNullAndEmptyArrays : true
      }
   }, {
      $unwind : {
         path                       : '$groups',
         preserveNullAndEmptyArrays : true
      }
   }, {
      $group : {
         _id    : '$group',
         group  : {
            $first : '$groups'
         },
         fields : {
            $push : {
               _id         : '$_id',
               title       : '$title',
               type        : '$type',
               description : '$description',
               allcats     : '$allcats',
               status      : '$status',
               order       : '$order',
               values      : '$values',
               unit        : '$unit'
            }
         }
      }
   }, {
      $unwind : {
         path                       : '$extra',
         preserveNullAndEmptyArrays : true
      }
   }, {
      $project : {
         _id         : 0,
         'group.__v' : 0
      }
   }, {
      $sort : {
         'group.order'  : 1,
         'fields.order' : 1
      }
   } ] );
};