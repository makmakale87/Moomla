const AdminController = require( '../AdminController' ),
   Users = require( MODELS + '/Users' );

class UsersController extends AdminController {
   
   async getIndexAction( req, res ) {
      this.setTitle( 'Список пользователей' );
      this.setParam( 'users', await Users.getAll() );
      this.getView( req, res, this.getParams() );
   }
   
   async getAddAction( req, res ) {
      this.setTitle( 'Новый пользователь' );
      this.getView( req, res, this.getParams() );
   }
   
   async postAddAction( req, res ) {
      return false;
   }
   
   async getEditAction( req, res ) {
      const { id } = req.query;
      const current = await Users.getOne( id );
      this.setParam( 'form', current );
      this.setTitle( 'Редактировать пользователя' );
      this.getView( req, res, this.getParams() );
   }
   
   async postEditAction( req, res ) {
      return false;
   }
   
}

module.exports = UsersController;