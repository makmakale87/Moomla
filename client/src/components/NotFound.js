import React, { Suspense } from 'react';
import HeaderComponent from './HeaderComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';

function NotFound() {
   return (
      <Suspense
         fallback={
            <div className="spinner-border text-secondary" role="status">
               <span className="sr-only">Loading...</span>
            </div>
         }
      >
         <HeaderComponent/>
         
         <NavbarComponent/>
         
         <div className="section">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h1>Not Found</h1>
                  </div>
               </div>
            </div>
         </div>
         
         <FooterComponent/>
      </Suspense>
   );
}

export default NotFound;
