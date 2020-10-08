//INDEX PAGE FORM SUBMIT
const form = $( '#adminForm' );

submitFilterForm = () => {
   $.ajax( {
      url      : form.attr( 'action' ),
      type     : 'POST',
      dataType : 'json',
      data     : form.serialize(),
      success  : function( data ) {
         window.location.href = data.url;
      }
   } );
};

form.keypress( function( e ) {
   let keycode = (e.keyCode ? e.keyCode : e.which);
   if ( keycode == 13 || keycode == 10 ) {
      form.submit();
      return false;
   }
} );

form.submit( function( e ) {
   e.preventDefault();
   submitFilterForm();
} );

form.change( function() {
   form.submit();
   return false;
} );