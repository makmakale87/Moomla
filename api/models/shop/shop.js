module.exports.getOptions = ( items ) => {
   let options = [];
   options.push( items.categories );
   options.push( items.products );
   options.push( items.orders );
   options.push( items.clients );
   options.push( items.config );
   options.push( items.info );
   
   return options;
};