import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const CategoriesContext = createContext();

export const CategoriesProvider = ( { children } ) => {
   const [ categories, setCategories ] = useState( [] );
   
   useEffect( () => {
      axios
         .get( '/api/site/shop?task=categories' )
         .then( ( res ) => setCategories( res.data ) )
         .catch( ( error ) => console.log( error ) );
   }, [] );
   
   return (
      <CategoriesContext.Provider value={[ categories, setCategories ]}>
         {children}
      </CategoriesContext.Provider>
   );
};