const options = require( COMPONENTS + '/shop/configs/other.config' ),
   config = require( MODELS + '/shop/config' ),
   other = require( MODELS + '/shop/other' ),
   MShopConfig = config
      .findOne()
      .select( '-_id -__v' )
      .lean();

class Sidebar {
   constructor( route = {} ) {
      if ( !route ) {
         this.link = '/';
      } else {
         this.link = route.link.endsWith( '/' ) ? route.link.slice( 0, -1 ) : route.link;
      }
   }
   
   async render() {
      const items = other( await MShopConfig, options );
      
      let html = '<div id="sidebar" class="list-group">';
      html += items.map( item => {
         return `
            <a href=${item.link}
            class="list-group-item list-group-item-action ${item.link === this.link ? 'active' : ''}"
            >${item.title}</a>`;
      } ).join( ' ' );
      html += '</div>';
      
      return html;
   }
}

module.exports = Sidebar;