const AdminController = require( '../AdminController' );
const mongoose = require( 'mongoose' );
const User = require( MODELS + '/Users' );
const bcrypt = require( 'bcrypt' );

class CpanelController extends AdminController {
   
   async getIndexAction( req, res ) {
      if ( !req.session.user ) {
         this.view = 'login';
         this.layout = false;
      } else {
         const config = require( '../shop/configs/shop.config' );
         const items = require( MODELS + '/shop/shop' ).getOptions( config );
         this.setParam( 'items', items );
         //
         this.setParam( 'info', {
            OS             : process.platform.replace( 'win32', 'Windows' ),
            NodeJS_version : process.version,
            DB             : `MongoDB (Mongoose ${mongoose.version})`,
            MoomlaVersion  : CONFIG.version
         } );
         this.user = req.session.user;
      }
      this.getView( req, res, this.getParams() );
   }
   
   async postIndexAction( req, res ) {
      try {
         const { login, password } = req.body;
         
         const user = await User.findOne( { login } ).lean();
         if ( !user ) {
            return res.status( 400 ).json( { message : 'Пользователь с таким логином не найден!' } );
         }
         
         const isMatch = await bcrypt.compare( password, user.password );
         if ( !isMatch ) {
            return res.status( 400 ).json( { message : 'Некорректный пароль!' } );
         }
         
         req.session.user = user;
         
         res.status( 200 ).json( user );
      } catch (e) {
         console.log( e.message );
         return res.status( 500 ).json( { message : 'Некорректные данные! Попробуйте еще раз.' } );
      }
   }
   
   getLogoutAction( req, res ) {
      req.session.destroy();
      res.redirect( '/admin' );
   }
}

module.exports = CpanelController;