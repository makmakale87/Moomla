module.exports = ( config, items ) => {
   let options = [];
   options.push( items.manufacturers );
   if ( config.use_rabatt_code ) {
      options.push( items.coupons );
   }
   options.push( items.currencies );
   if ( config.tax ) {
      options.push( items.taxes );
   }
   if ( config.without_payment ) {
      options.push( items.payments );
   }
   options.push( items.deliverytimes );
   options.push( items.orderstatus );
   options.push( items.units );
   if ( config.admin_show_vendors ) {
      options.push( items.vendors );
   }
   options.push( items.reviews );
   if ( config.admin_show_product_labels ) {
      options.push( items.productlabels );
   }
   if ( config.admin_show_product_extra_field ) {
      options.push( items.productfields );
   }
   if ( config.admin_show_languages ) {
      options.push( items.languages );
   }
   
   return options;
};