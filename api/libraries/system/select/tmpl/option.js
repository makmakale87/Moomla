module.exports.getTmpl = ( ops ) => {
   return this.getOptions( ops );
};

module.exports.option = ( ops, level ) => {
   let $sel = ops.item._id.toString() === ops.selected.toString() ? 'selected="selected"' : '';
   return `
      <option value="${ops.item._id}"
          ${ops.className ? `class="${ops.className}"` : ''}
          ${$sel}>
          ${ops.tab.repeat( level ) + ops.item.title}
      </option>`;
};

module.exports.getOptions = ( ops, level = 0 ) => {
   let html = '';
   
   html += this.option( ops, level++ );
   if ( ops.item.childNodes && ops.item.childNodes.length > 0 ) {
      ops.item.childNodes.forEach( child => {
         ops.item = child;
         html += this.getOptions( ops, level );
      } );
   }
   
   return html;
};