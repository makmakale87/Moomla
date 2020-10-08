import React from 'react';

function NavbarComponent() {
   return (
      <nav id="navigation">
         <div className="container">
            <div id="responsive-nav">
               <ul className="main-nav nav navbar-nav">
                  <li className="active"><a href="/">Home</a></li>
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default NavbarComponent;