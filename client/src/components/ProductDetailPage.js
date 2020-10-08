import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import NavbarComponent from '../components/NavbarComponent';
import ProductDetail from '../components/products/ProductDetailComponent';
import FooterComponent from '../components/FooterComponent';

function ProductDetailPage() {
   return (
      <React.Fragment>
         <HeaderComponent/>
         <NavbarComponent/>
         <ProductDetail/>
         <FooterComponent/>
      </React.Fragment>
   );
}

export default ProductDetailPage;