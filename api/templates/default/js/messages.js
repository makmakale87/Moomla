showMessage = ( type, text ) => {
   let msgTitle = '';
   switch ( type ) {
      case 'success':
         msgTitle = 'Успешное выполнение';
         break;
      case 'warning':
         msgTitle = 'Предупреждение';
         break;
      case 'danger':
         msgTitle = 'Ошибка';
         break;
      default:
         msgTitle = 'Сообщение';
   }
   
   let tmpl = `<div class="toast-header bg-${type} text-white">
                  <strong class="mr-auto">${msgTitle}</strong>
                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Закрыть">
                       <span class="text-white" aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="toast-body">${text}</div>`;
   
   $( '.toast' ).html( tmpl );
   $( '.toast' ).toast( 'show' );
}