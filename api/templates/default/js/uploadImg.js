const imgPath = $( '#imgFile' ).attr( 'data-img' );
const imgLabel = $( '#imgFileLabel' );
if ( imgPath ) {
   const newLabelText = imgPath.match( /\w+.(png|jpe?g)$/ )[0].split( '.' )[0] || 'Выбрать';
   imgLabel.text( newLabelText );
}