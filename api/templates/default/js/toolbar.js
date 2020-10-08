submitButton = ( task ) => {
   const form = $( '#adminForm' );
   
   if ( task === 'save' || task === 'apply' ) {
      if ( typeof CKEDITOR.instances['mooEditor'] != 'undefined' ) {
         CKEDITOR.instances['mooEditor'].updateElement();
      }
      
      let link = window.location.href;
      if ( task === 'save' ) {
         link += '&submit=' + task;
      }
      
      form.on( 'submit', async function( e ) {
         e.preventDefault();
         let formData = new FormData( form[0] );
         let fd_extra_fields = [];
         
         $.each( $( '[name^=\"extra_fields\"]' ), function() {
            let field = {};
            field.name = $( this )[0].name.replace( 'extra_fields[', '' ).replace( ']', '' );
            field.value = $( this ).val();
            if ( field.value != 0 ) {
               fd_extra_fields.push( field );
            }
         } );
         
         if ( fd_extra_fields.length > 0 ) {
            formData.set( 'extra_fields', JSON.stringify( fd_extra_fields ) );
         }
         
         let response = await fetch( link, {
            method : 'POST',
            body   : formData
         } );
         
         let result = await response.json();
         if ( result.url ) {
            window.location.href = result.url;
         }
         if ( result.message ) {
            showMessage( 'danger', result.message );
         }
      } );
      
      form.submit();
   }
   if ( task === 'cancel' ) window.location.href = window.location.pathname;
   if ( task === 'trash' ) {
      const id = event.target.closest( 'button' ).getAttribute( 'data-id' );
      const link = window.location.pathname + '?task=delete';
      
      const decision = confirm( 'Вы уверены?' );
      if ( decision ) {
         fetch( link, {
            method  : 'POST',
            body    : JSON.stringify( { id : id } ),
            headers : {
               'Content-Type' : 'application/json'
            }
         } )
            .then( res => res.json() )
            .then( res => {
               if ( res.url ) {
                  window.location.href = res.url;
               } else if ( res.message ) {
                  showMessage( 'danger', res.message );
               }
            } )
            .catch( err => console.log( err ) );
      }
   }
}
