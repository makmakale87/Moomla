const mongoose = require( 'mongoose' );

const UsersSchema = new mongoose.Schema( {
   name     : { type : String, trim : true },
   login    : { type : String, required : true, unique : true, trim : true },
   email    : { type : String, required : true, unique : true },
   password : { type : String, required : true, trim : true },
   role     : {
      type    : String,
      enum    : [ 'user', 'admin' ],
      default : 'user'
   },
   status   : {
      type    : String,
      enum    : [ 'public', 'unpublic' ],
      default : 'public'
   },
   order    : { type : Number, default : 0 }
} );

const Users = mongoose.model( 'users', UsersSchema );
module.exports = Users;

module.exports.getAll = () => {
   return Users.find()
      .select( '-__v' )
      .lean();
};
module.exports.getOne = ( id ) => {
   return Users.findOne( { _id : id } )
      .select( '-__v' )
      .lean();
};
