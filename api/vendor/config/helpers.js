const dash = '&mdash;';
const subdash = '&mdash; ';
const moment = require( 'moment' );

module.exports = {
   select : function( selected, options ) {
      if ( selected ) {
         return options
            .fn( this )
            .replace( new RegExp( ` value="${selected}"` ), '$&selected="selected"' );
      } else {
         return options.fn( this );
      }
   },
   
   multiSelect : function( selected, options ) {
      let html = options.fn( this );
      if ( selected ) {
         for ( let i = 0; i < selected.length; i++ ) {
            html = html.replace( new RegExp( ` value="${selected[i]}"` ), '$&selected="selected"' );
         }
      }
      return html;
   },
   
   check : function( checked ) {
      return checked ? 'checked' : '';
   },
   
   radioSwitch : function( selected, options ) {
      return options
         .fn( this )
         .replace( new RegExp( `value="${selected}"` ), '$&checked="checked"' );
   },
   
   if_eq : function( a, b, options ) {
      return JSON.stringify( a ) === JSON.stringify( b ) ? options.fn( this ) : options.inverse( this );
   },
   
   extra_field : function( arr, what, options ) {
      if ( !arr.length || !what ) return;
      
      let res = arr.filter( item => {
         if ( JSON.stringify( item.name ) === JSON.stringify( what ) ) {
            return item.value;
         }
      } );
      return res.length > 0 ? res[0].value : '';
   },
   
   tree : ( items, options, level = 0 ) => {
      let html = '';
      items.forEach( item => {
         if ( item.childNodes.length > 0 ) {
            html += treeTitle( options, item, level );
            html += sublevel( item.childNodes, options, level + 1 );
         } else {
            html += treeTitle( options, item, level );
         }
      } );
      return html;
   },
   
   getStatus : function( status ) {
      const type = status === 'public' ? 'success' : 'danger';
      const icon = status === 'public' ? 'fa-check' : 'fa-times-circle';
      
      return `<div class="text-${type}"><i class="fa ${icon}"></i>`;
   },
   
   deleteButton : function( id ) {
      return `<button onclick="submitButton('trash')" type="button" data-id="${id}" class="btn btn-sm btn-danger" title="Удалить"><i class="fa fa-trash"></i></button>`;
   },
   
   formatDate : function( date, format ) {
      return `<span class="badge badge-light">${moment( date ).format( format )}</span>`;
   },
   
   adminTable : `id="adminTable" width="100%" cellspacing="0" class="table table-bordered table-striped"`
   
};

function sublevel( tree, options, level ) {
   let html = '';
   tree.forEach( item => {
      if ( item.childNodes && item.childNodes.length > 0 ) {
         html += treeTitle( options, item, level );
         html += sublevel( item.childNodes, options, level + 1 );
      } else {
         html += treeTitle( options, item, level );
      }
   } );
   return html;
}

function treeTitle( options, item, level ) {
   return options.fn( item )
      .replace( new RegExp( item.title ),
         dash.repeat( level ) + item.title )
      .replace( new RegExp( item.alias ),
         subdash.repeat( level ) + 'Псевдоним: ' + item.alias );
}