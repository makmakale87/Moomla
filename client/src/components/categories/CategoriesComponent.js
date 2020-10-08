import React, { useContext } from 'react';
import CategoryItemComponent from './CategoryItemComponent';
import { CategoriesContext } from '../../context/CategoriesContext';

function CategoriesComponent( props ) {
   const [ categories, setCategories ] = useContext( CategoriesContext );
   
   return (
      <div className="aside">
         <h3 className="aside-title">Категории</h3>
         <div className="checkbox-filter">
            {categories.map( category => {
               return <CategoryItemComponent category={category} key={category._id} onChange={props.onToggle}/>;
            } )}
         </div>
      </div>
   );
}

export default CategoriesComponent;