const fs = require( 'fs' ),
   path = require( 'path' );

module.exports = {
   
   logger : ( message, context ) => {
      if ( CONFIG.debug ) {
         console.log( `${context.route.controller} :: ${context.route.action} :: ${message}` );
      }
   },
   
   isAuth : ( req, res, next ) => {
      if ( req.session.user ) {
         next();
      } else {
         res.redirect( '/admin' );
      }
   },
   
   makeAlias : ( str ) => {
      str = str.trim();
      
      let ru = {
         'а' : 'a', 'б' : 'b', 'в' : 'v', 'г' : 'g', 'д' : 'd',
         'е' : 'e', 'ё' : 'e', 'ж' : 'j', 'з' : 'z', 'и' : 'i', 'й' : 'j',
         'к' : 'k', 'л' : 'l', 'м' : 'm', 'н' : 'n', 'о' : 'o',
         'п' : 'p', 'р' : 'r', 'с' : 's', 'т' : 't', 'у' : 'u',
         'ф' : 'f', 'х' : 'h', 'ц' : 'c', 'ч' : 'ch', 'ш' : 'sh',
         'щ' : 'shch', 'ы' : 'y', 'э' : 'e', 'ю' : 'u', 'я' : 'ya',
         ' ' : '-', '/' : '-'
      }, n_str = [];
      
      str = str.replace( /[ъь]+/g, '' );
      
      for ( let i = 0; i < str.length; ++i ) {
         n_str.push(
            ru[str[i]]
            || ru[str[i].toLowerCase()] == undefined && str[i]
            || ru[str[i].toLowerCase()].replace( /^(.)/, function( match ) {
               return match.toUpperCase();
            } )
         );
      }
      
      return n_str.join( '' ).toLowerCase();
   },
   
   getTree : async ( data ) => {
      const dataset = await data;
      
      let hashTable = Object.create( null );
      dataset.forEach( item => hashTable[item._id] = { ...item, childNodes : [] } );
      
      let dataTree = [];
      dataset.forEach( item => {
         if ( item.parent ) {
            if ( !hashTable[item.parent] ) {
               dataTree.push( hashTable[item._id] );
            } else {
               hashTable[item.parent].childNodes.push( hashTable[item._id] );
            }
         } else {
            dataTree.push( hashTable[item._id] );
         }
      } );
      
      return dataTree;
   },
   
   isEmpty : noFiles,
   
   uploadPath : ( files, dirpath ) => {
      let filename = '';
      if ( !noFiles( files ) ) {
         let file = files.image;
         filename = file.name;
         
         let uploadDir = dirpath;
         if ( !fs.existsSync( uploadDir ) ) {
            try {
               fs.mkdirSync( dirpath, { recursive : true } );
            } catch (e) {
               console.error( e.message );
            }
         }
         
         file.mv( uploadDir + filename, ( err ) => {
            if ( err ) throw err;
         } );
         return uploadDir.substr( 1 ) + filename;
      }
   }
   
};

function noFiles( obj ) {
   for ( let key in obj ) {
      if ( obj.hasOwnProperty( key ) ) {
         return false;
      }
   }
   return true;
}