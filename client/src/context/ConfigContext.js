import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ConfigContext = createContext();

export const ConfigProvider = props => {
   const [ config, setConfig ] = useState( {} );
   
   useEffect( () => {
      axios
         .get( '/api/site/shop?task=config' )
         .then( ( res ) => setConfig( res.data ) )
         .catch( ( error ) => console.log( error ) );
   }, [] );
   
   return (
      <ConfigContext.Provider value={config}>
         {props.children}
      </ConfigContext.Provider>
   );
};