$( '#adminTable > tbody' ).sortable( {
   axis        : 'y',
   cursor      : 'move',
   handle      : 'td.icon-move',
   revert      : 100,
   items       : 'tr:not(.ui-state-disabled)',
   cancel      : '.ui-state-disabled',
   placeholder : 'ui-sortable-placeholder',
   
   helper : ( e, ui ) => {
      ui.children().each( function() {
         $( this ).width( $( this ).width() );
      } );
      return ui;
   },
   
   update : () => {
      let data = $( '#adminTable > tbody' ).sortable( 'toArray', {
         attribute : 'data-id'
      } );
      
      $.ajax( {
         type        : 'POST',
         async       : true,
         url         : window.location.pathname + '?task=order',
         data        : JSON.stringify( data ),
         dataType    : 'json',
         contentType : 'application/json',
         error       : function() {
            return false;
         },
         success     : function() {
            return false;
         }
      } );
   }
} ).disableSelection();