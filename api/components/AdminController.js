const Controller = require( CORE + '/base/Controller' ),
   fs = require( 'fs' ),
   functions = require( LIBRARIES + '/functions' );

class AdminController extends Controller {
   #title = '';
   #params = {};
   #offToolbar = false;
   
   constructor( route ) {
      super( route );
      this.baseLink = this.route.link;
      this._ = functions;
   }
   
   setIndexPageSettings( req, filepath ) {
      let data = req.body;
      for ( let key in data ) {
         data[key] = true;
      }
      
      try {
         fs.writeFileSync( filepath, JSON.stringify( data ) );
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
   
   getIndexPageSettings( filepath ) {
      const settings = {};
      if ( fs.existsSync( filepath ) ) {
         fs.readFile( filepath, 'utf8', function( error, data ) {
            if ( error ) throw error;
            
            let filedata = JSON.parse( data );
            for ( const key in filedata ) {
               settings[key] = filedata[key];
            }
         } );
      }
      this.setParam( 'settings', settings );
   }
   
   //
   setTitle( name, title = '' ) {
      if ( !name ) return;
      this.#title = title ? `${name} / ${title}` : name;
   }
   
   getTitle() {
      return this.#title;
   }
   
   setFilter( req ) {
      const { filter } = req.body;
      let url = this.baseLink, path = '';
      
      if ( filter ) {
         for ( const key in filter ) {
            if ( !filter[key] || filter[key] == 0 ) {
               continue;
            }
            path += `&${key}=${filter[key]}`;
         }
      }
      path.indexOf( '&' ) == 0 ? path = path.replace( '&', '?' ) : path;
      url += path;
      
      return url;
   }
   
   getFilter( req ) {
      let options = JSON.parse( JSON.stringify( req.query ) );
      
      for ( const key in options ) {
         if ( key === 'search' ) {
            options['title'] = new RegExp( options[key], 'i' );
            delete options[key];
         }
      }
      
      this.setParam( 'filter', req.query );
      return options;
   }
   
   toolbar( id = null ) {
      let $task = this.route['action'];
      let $link = this.route['link'];
      let $html = '';
      
      if ( $task === 'index' ) {
         $link += $link.includes( '?' ) ? '&' : '?';
         $link += 'task=add';
         $html += `<a class="btn btn-primary mr-2" href="${$link}" title="Создать"><i class='fa fa-plus'></i></a>`;
      } else if ( $task === 'add' || $task === 'edit' ) {
         $html += `<button onclick="submitButton('save')" type="button" class="btn btn-success mr-2" title="Сохранить и закрыть"><i class="fa fa-save"></i></button>`;
         $html += `<button onclick="submitButton('apply')" type="button" class="btn btn-success mr-2" title="Сохранить"><i class="fa fa-check"></i></button>`;
         $html += `<a class="btn btn-warning mr-2" href="${$link}" title="Закрыть"><i class='fa fa-times'></i></a>`;
         if ( $task == 'edit' ) {
            $html += `<button onclick="submitButton('trash')" type="button" data-id="${id}" class="btn btn-danger" title="Удалить"><i class="fa fa-trash"></i></a>`;
         }
      }
      
      return $html;
   }
   
   turnOffToolbar() {
      this.#offToolbar = true;
   }
   
   //
   setParam( name, value ) {
      this.#params[name] = value;
   }
   
   getParams( id = null ) {
      this.setParam( 'title', this.getTitle() !== '' ? this.getTitle() : 'MooShopping' );
      if ( !this.#offToolbar ) {
         this.setParam( 'toolbar', this.toolbar( id ) );
      }
      return this.#params;
   }
   
   //====================SAVE ACTION==========================
   redirect( req, res, id ) {
      const { submit } = req.query;
      const url = submit !== 'save' ? this.baseLink + '?task=edit&id=' + id : this.baseLink;
      res.status( 200 ).json( { url } );
   }
   
   //====================CREATE POST ACTION==========================
   async postAddAction( req, res ) {
      try {
         let data = await this.validate( req, res );
         data.order = await this.baseModel.countDocuments() + 1;
         const model = new this.baseModel( data );
         const created = await model.save();
         this.redirect( req, res, created._id );
      } catch (e) {
         console.log( `AdminController::postAddAction::${e.message}` );
      }
   }
   
   //====================POST EDIT ACTION==========================
   async postEditAction( req, res ) {
      try {
         const { id } = req.query;
         let data = await this.validate( req, res, id );
         await this.baseModel.updateOne( { _id : id }, data );
         this.redirect( req, res, id );
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
   
   //====================SET DEFAULT ACTION==========================
   async postSetdefaultAction( req, res ) {
      try {
         const { id } = req.body;
         await this.baseModel.updateMany( { isDefault : true }, { $set : { isDefault : false } } );
         await this.baseModel.updateOne( { _id : id }, { $set : { isDefault : true } } );
         res.status( 200 ).json( { updated : true } );
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
   
   //*DELETE main image*//
   async deleteEditAction( req, res ) {
      try {
         const { id } = req.query;
         await this.baseModel.updateOne( { _id : id }, { image : '' } );
         res.status( 200 ).json( { deleted : true } );
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
   
   //====================SORT ACTION==========================
   async postOrderAction( req, res ) {
      try {
         const ids = req.body;
         for ( let i = 0; i < ids.length; i++ ) {
            await this.baseModel
               .updateOne( { _id : ids[i] }, { order : i } );
         }
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
   
   //====================DELETE ACTION==========================
   async postDeleteAction( req, res ) {
      try {
         const { id } = req.body;
         if ( !id ) return res.status( 400 ).json( { message : 'Id не найден!' } );
         await this.baseModel.deleteOne( { _id : id } );
         res.status( 200 ).json( { url : this.baseLink } );
      } catch (e) {
         this._.logger( e.message, this );
      }
   }
}

module.exports = AdminController;