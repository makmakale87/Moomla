import React from 'react';

function ManufacturerItemComponent( { manufacturer, onChange } ) {
   return (
      <div className="input-checkbox">
         <input type="checkbox" id={`brand-${manufacturer._id}`} onChange={() => onChange( manufacturer._id )}/>
         <label htmlFor={`brand-${manufacturer._id}`}>
            <span></span>
            {manufacturer.title}
            &nbsp;
            <small>({manufacturer.products.length})</small>
         </label>
      </div>
   );
}

export default ManufacturerItemComponent;