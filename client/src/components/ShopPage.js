import React, { Suspense, useState, useEffect, useContext } from 'react';
import HeaderComponent from './HeaderComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import ManufacturersComponent from './manufacturers/ManufacturersComponent';
import CategoriesComponent from './categories/CategoriesComponent';
import ProductListComponent from './products/ProductListComponent';
import axios from 'axios';
import { ConfigContext } from '../context/ConfigContext';

function ShopPage() {
   const config = useContext( ConfigContext );
   const [ products, setProducts ] = useState( [] );
   
   let [ filterCategories, setFilterCategories ] = useState( [] );
   let [ filterManufacturers, setFilterManufacturers ] = useState( [] );
   
   useEffect( () => {
      getProducts();
   }, [] );
   
   const toggleCategories = id => {
      if ( !filterCategories.includes( id ) ) {
         filterCategories.push( id );
      } else {
         filterCategories = filterCategories.filter( ( i ) => i !== id );
      }
      setFilterCategories( filterCategories );
      getProducts();
   };
   
   const toggleManufacturers = id => {
      if ( !filterManufacturers.includes( id ) ) {
         filterManufacturers.push( id );
      } else {
         filterManufacturers = filterManufacturers.filter( ( i ) => i !== id );
      }
      setFilterManufacturers( filterManufacturers );
      getProducts();
   };
   
   const getProducts = () => {
      axios
         .get( '/api/site/shop?task=products', {
            params : {
               filterCategories    : filterCategories,
               filterManufacturers : filterManufacturers
            }
         } )
         .then( ( res ) => setProducts( res.data ) )
         .catch( ( error ) => console.log( error ) );
   };
   
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
                  <div id="aside" className="col-md-3">
                     <CategoriesComponent onToggle={toggleCategories}/>
                     <ManufacturersComponent onToggle={toggleManufacturers}/>
                  </div>
                  
                  <div id="store" className="col-md-9">
                     {config.show_sort_product || config.show_count_select_products ?
                        <div className="store-filter clearfix">
                           <div className="store-sort">
                              {config.show_sort_product ?
                                 <label>
                                    Sort By:&nbsp;
                                    <select className="input-select">
                                       <option value="0">Popular</option>
                                       <option value="1">Position</option>
                                       <option value="2">Price</option>
                                    </select>
                                 </label>
                                 : ''}
                              {config.show_count_select_products ?
                                 <label>
                                    Show:&nbsp;
                                    <select
                                       className="input-select"
                                       value={config.count_products_to_page}
                                    >
                                       <option value="30">30</option>
                                       <option value="60">60</option>
                                       <option value="90">90</option>
                                    </select>
                                 </label>
                                 : ''}
                           </div>
                        </div>
                        : ''}
                     
                     <ProductListComponent products={products} config={config}/>
                  </div>
               </div>
            </div>
         </div>
         
         <FooterComponent/>
      </Suspense>
   );
}

export default ShopPage;
