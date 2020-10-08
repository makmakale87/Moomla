require( 'dotenv' ).config();

module.exports = {
   port        : process.env.PORT,
   debug       : false,
   viewOptions : { compileDebug : true, self : true, cache : false },
   session     : {
      secret : 'RwqjRpZXOhcYf4Tw'
   },
   db          : {
      url     : process.env.MONGO_URI,
      options : {
         useNewUrlParser    : true,
         useUnifiedTopology : true,
         useCreateIndex     : true,
         useFindAndModify   : false
      }
   },
   defaultTmpl : 'default',
   version     : '1.3.24'
};