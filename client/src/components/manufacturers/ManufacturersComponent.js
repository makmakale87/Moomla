import React, { useContext } from 'react';
import ManufacturerItemComponent from './ManufacturerItemComponent';
import { ManufacturersContext } from '../../context/ManufacturersContext';

function ManufacturersComponent( props ) {
   const [ manufacturers, setManufacturers ] = useContext( ManufacturersContext );
   
   return (
      <div className="aside">
         <h3 className="aside-title">Производители</h3>
         <div className="checkbox-filter">
            {manufacturers.map( m => {
               return <ManufacturerItemComponent manufacturer={m} key={m._id} onChange={props.onToggle}/>;
            } )}
         </div>
      </div>
   );
}

export default ManufacturersComponent;