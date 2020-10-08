const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProductsSchema = new Schema( {
   title             : { type : String, required : true, trim : true },
   alias             : { type : String, trim : true, required : true, unique : true },
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

   price             : { type : Number },
   new_price         : { type : Number },
   fullprice         : { type : Number },
   currency          : { type : Schema.Types.ObjectId, ref : 'mshop_currencies' },
   product_code      : { type : String },
   count             : { type : Number },
   unlimit           : { type : Boolean },
   taxes             : { type : Number },
   weight            : { type : Number },
   manufacturer      : { type : Schema.Types.ObjectId, ref : 'mshop_manufacturers' },
   deliverytimes     : { type : Schema.Types.ObjectId, ref : 'mshop_delivery_times' },
   mark              : { type : Schema.Types.ObjectId, ref : 'mshop_product_labels' },
   units             : { type : Schema.Types.ObjectId, ref : 'mshop_units' },

   parent            : { type : Schema.Types.ObjectId, ref : 'mshop_categories' },
   image             : { type : String },
   img_position      : { type : String },
   order             : { type : Number, default : 0 },

   extra_fields      : []
}, {
   timestamps : { createdAt : 'created_at', updatedAt : 'updated_at' }
} );

const Products = mongoose.model( 'mshop_products', ProductsSchema );
module.exports = Products;

module.exports.getAll = ( options = {} ) => {
   return Products.find( options )
      .select( '-__v' )
      .populate( 'parent' )
      .populate( 'manufacturer' )
      .populate( 'mark' )
      .populate( 'units' )
      .populate( 'deliverytimes' )
      .populate( 'currency' )
      .sort( 'order' )
      .lean();
};


module.exports.getOne = ( id ) => {
   return Products.findOne( { _id : id } )
      .select( '-__v' )
      .populate( 'parent' )
      .populate( 'manufacturer' )
      .populate( 'mark' )
      .populate( 'units' )
      .populate( 'deliverytimes' )
      .populate( 'currency' )
      .lean();
};

module.exports.productDetail = ( alias ) => {
   let match = {};
   if ( alias ) {
      match = { alias : alias };
   }
   
   return Products.aggregate(
      [ { $match : match }, {
         $unwind : {
            path : '$extra_fields'
         }
      }, {
         $lookup : {
            from         : 'mshop_products_extra_fields',
            localField   : 'extra_fields.name',
            foreignField : '_id',
            as           : 'fields'
         }
      }, {
         $unwind : {
            path : '$fields'
         }
      }, {
         $lookup : {
            from         : 'mshop_products_extra_field_values',
            localField   : 'extra_fields.value',
            foreignField : '_id',
            as           : 'values'
         }
      }, {
         $addFields : {
            'fields.value' : {
               $cond : {
                  if   : {
                     $and : [
                        { $isArray : '$values' },
                        { $ne : [ { $size : '$values' }, 0 ] }
                     ]
                  },
                  then : '$values',
                  else : '$extra_fields.value'
               }
            }
         }
      }, {
         $group : {
            _id    : '$_id',
            fields : {
               $addToSet : '$fields'
            }
         }
      }, {
         $unwind : {
            path : '$fields'
         }
      }, {
         $lookup : {
            from         : 'mshop_products_extra_field_groups',
            localField   : 'fields.group',
            foreignField : '_id',
            as           : 'fields.group'
         }
      }, {
         $unwind : {
            path                       : '$fields.group',
            preserveNullAndEmptyArrays : true
         }
      }, {
         $lookup : {
            from         : 'mshop_units',
            localField   : 'fields.unit',
            foreignField : '_id',
            as           : 'fields.unit'
         }
      }, {
         $unwind : {
            path                       : '$fields.unit',
            preserveNullAndEmptyArrays : true
         }
      }, {
         $group : {
            _id : {
               p : '$_id',
               g : '$fields.group'
            },
            f   : {
               $addToSet : '$fields'
            }
         }
      }, {
         $addFields : {
            '_id.g.f' : '$f'
         }
      }, {
         $project : {
            _id : '$_id.p',
            f   : '$_id.g'
         }
      }, {
         $sort : {
            'f.order' : 1
         }
      }, {
         $group : {
            _id : '$_id',
            ef  : {
               $addToSet : '$f'
            }
         }
      }, {
         $lookup : {
            from         : 'mshop_products',
            localField   : '_id',
            foreignField : '_id',
            as           : 'product'
         }
      }, {
         $unwind : {
            path : '$product'
         }
      }, {
         $addFields : {
            'product.extra_fields' : '$ef'
         }
      }, {
         $replaceRoot : {
            newRoot : '$product'
         }
      }, {
         $sort : {
            order : 1
         }
      }, {
         $lookup : {
            from         : 'mshop_categories',
            localField   : 'parent',
            foreignField : '_id',
            as           : 'parent'
         }
      }, {
         $unwind : {
            path                       : '$parent',
            preserveNullAndEmptyArrays : true
         }
      }, {
         $lookup : {
            from         : 'mshop_manufacturers',
            localField   : 'manufacturer',
            foreignField : '_id',
            as           : 'manufacturer'
         }
      }, {
         $unwind : {
            path                       : '$manufacturer',
            preserveNullAndEmptyArrays : true
         }
      }, {
         $lookup : {
            from         : 'mshop_product_labels',
            localField   : 'mark',
            foreignField : '_id',
            as           : 'mark'
         }
      }, {
         $unwind : {
            path                       : '$mark',
            preserveNullAndEmptyArrays : true
         }
      } ]
   );
};