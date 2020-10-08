import React from 'react';

function CategoryItemComponent( { category, onChange } ) {
   return (
      <div className="input-checkbox">
         <input type="checkbox" id={`category-${category._id}`} onChange={()=>onChange( category._id )}/>
         <label htmlFor={`category-${category._id}`}>
            <span></span>
            {category.title}
            &nbsp;
            <small>({category.count})</small>
         </label>
      </div>
   );
}

export default CategoryItemComponent;