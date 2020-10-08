const config = require( ROOT + '/configuration' ),
   session = require( 'express-session' ),
   mongoose = require( 'mongoose' ),
   mongoStore = require( 'connect-mongo' )( session );

module.exports = ( app ) => {
   app.use( session( {
      secret            : config.session.secret,
      resave            : true,
      saveUninitialized : true,
      store             : new mongoStore( { mongooseConnection : mongoose.connection } ),
      cookie            : { httpOnly : true, maxAge : null } //24 * 60 * 60 * 1000
   } ) );
};