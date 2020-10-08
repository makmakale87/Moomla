const mongoose = require( 'mongoose' ),
   config = require( ROOT + '/configuration' ).db;

mongoose.Promise = Promise;
mongoose.set( 'runValidators', true );

module.exports.connectDb = async () => {
   try {
      await mongoose.connect(
         config.url,
         config.options
      );
      console.log( `MongoDB connected` );
   } catch (e) {
      console.log( e.message );
      process.exit( 1 );
   }
};