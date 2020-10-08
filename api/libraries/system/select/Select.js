class Select {
   data;
   tmpl;
   name;
   id;
   select_id;
   select_class = 'custom-select';
   size;
   option_class;
   default = 'Выбрать';
   disable_default = false;
   tab = '|&mdash;';
   multiple;
   selected;
   
   constructor( selector, options = {} ) {
      this.data = selector;
      this.tmpl = require( __dirname + '/tmpl/option' );
      this.getOptions( options );
      return this.getSelectTemplate();
   }
   
   getOptions( options ) {
      for ( const key in options ) {
         if ( this.hasOwnProperty( key ) ) {
            this[key] = options[key];
         }
      }
   }
   
   async getSelectTemplate() {
      let $selectHTML = '<select';
      $selectHTML += this.name ? ` name="${this.name}"` : '';
      $selectHTML += this.select_id ? ` id="${this.select_id}"` : ` id="${this.name}"`;
      $selectHTML += ` class="${this.select_class}"`;
      $selectHTML += this.size ? ` size="${this.size}"` : '';
      $selectHTML += this.multiple ? ` multiple="multiple"` : '';
      $selectHTML += '>';
      $selectHTML += `
      <option value="0" ${this.option_class ? 'class=""' : ''} ${this.disable_default ? 'disabled="disabled"' : 'selected="selected"'}>
            ${this.default ? this.default : '- - -'}
      </option>`;
      
      $selectHTML += await this.getOptionTemplate();
      
      $selectHTML += '</select>';
      return $selectHTML;
   }
   
   async getOptionTemplate() {
      let $optionHTML = '';
      await this.data.forEach( item => {
         $optionHTML += this.tmpl.getTmpl( {
            item      : item,
            tab       : this.tab,
            className : this.option_class,
            selected  : this.selected ? this.selected : ''
         } );
      } );
      return $optionHTML;
   }
}

module.exports = Select;