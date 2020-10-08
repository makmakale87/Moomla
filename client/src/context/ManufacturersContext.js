import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ManufacturersContext = createContext();

export const ManufacturersProvider = ( { children } ) => {
   const [ manufacturers, setManufacturers ] = useState( [] );
   
   useEffect( () => {
      axios
         .get( '/api/site/shop?task=manufacturers' )
         .then( ( res ) => setManufacturers( res.data ) )
         .catch( ( error ) => console.log( error ) );
   }, [] );
   
   return (
      <ManufacturersContext.Provider value={[ manufacturers, setManufacturers ]}>
         {children}
      </ManufacturersContext.Provider>
   );
};