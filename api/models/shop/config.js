const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema( {
   enable_wishlist                : { type : Boolean, default : false },
   use_rabatt_code                : { type : Boolean, default : false },
   shop_user_guest                : { type : Number, default : 0 },
   admin_show_languages           : { type : Boolean, default : true },
   without_shipping               : { type : Boolean, default : true },
   without_payment                : { type : Boolean, default : false },
   admin_show_vendors             : { type : Boolean, default : true },
   admin_show_units               : { type : Boolean, default : true },
   tax                            : { type : Boolean, default : true },
   stock                          : { type : Boolean, default : true },
   date_format                    : { type : String },

   admin_show_delivery_time       : { type : Boolean, default : true },
   admin_show_product_video       : { type : Boolean, default : false },
   admin_show_product_related     : { type : Boolean, default : true },
   admin_show_product_files       : { type : Boolean, default : true },
   admin_show_product_labels      : { type : Boolean, default : true },
   admin_show_product_basic_price : { type : Boolean, default : true },
   admin_show_product_extra_field : { type : Boolean, default : true },
   admin_show_weight              : { type : Boolean, default : true },

   contact_email                  : { type : String, trim : true },
   defaultLanguage                : { type : String, default : 'ru-RU' },
   display_price_admin            : { type : Number, default : 0 },
   display_price_front            : { type : Number, default : 0 },

   count_products_to_page         : { type : Number, default : 30 },
   show_buy_in_category           : { type : Boolean, default : true },
   show_sort_product              : { type : Boolean, default : true },
   show_count_select_products     : { type : Boolean, default : true },
   show_product_list_filters      : { type : Boolean, default : false },
   product_list_show_weight       : { type : Boolean, default : true },
   product_list_show_manufacturer : { type : Boolean, default : false },
   product_list_show_product_code : { type : Boolean, default : false },
   product_list_show_qty_stock    : { type : Boolean, default : false },

   show_tax_in_product            : { type : Boolean, default : true },
   show_tax_product_in_cart       : { type : Boolean, default : false },
   show_plus_shipping_in_product  : { type : Boolean, default : false },
   hide_product_not_avaible_stock : { type : Boolean, default : false },
   hide_buy_not_avaible_stock     : { type : Boolean, default : false },
   show_delivery_time             : { type : Boolean, default : true },
   product_hide_price_null        : { type : Boolean, default : false }
} );

const mShopConfig = mongoose.model( 'mshop_config', schema );
module.exports = mShopConfig;
