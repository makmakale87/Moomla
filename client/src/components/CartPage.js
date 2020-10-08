import React, { Suspense } from 'react';
import HeaderComponent from './HeaderComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';

function CartPage() {
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
                  <div id="store" className="col-md-12">
                     <h1>Корзина</h1>
                     <h3>Ваша корзина пуста</h3>
                  </div>
               </div>
            </div>
         </div>
         
         <FooterComponent/>
      </Suspense>
   );
}

export default CartPage;
