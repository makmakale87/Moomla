import React from 'react';
import RatingBlock from './RatingBlock';
import { Link } from 'react-router-dom';

function ProductListComponent( props ) {
   return (
      <div className="product-list">
         {props.products.map( prod =>
            <div key={prod._id} className="product">
               
               <div className="product-img">
                  <img src={prod.image} alt={prod.title}/>
                  {prod.mark ?
                     <div className="product-label">
                        {prod.mark.image ?
                           <img src={prod.mark.image} alt={prod.mark.title}/>
                           : <span className="new">{prod.mark.title}</span>
                        }
                     </div>
                     : ''
                  }
               </div>
               
               <div className="product-body">
                  <p className="product-category">{prod.parent.title}</p>
                  <h3 className="product-name"><Link to={'/product/' + prod.alias}>{prod.title}</Link></h3>
                  
                  {prod.new_price ?
                     <h4 className="product-price">{prod.new_price}
                        <del className="product-old-price"> {prod.fullprice}</del>
                     </h4> :
                     <h4 className="product-price">{prod.fullprice}</h4>
                  }
                  
                  <RatingBlock/>
                  
                  <div className="product-btns">
                     {props.config.enable_wishlist ?
                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">В пожелания</span></button>
                        : ''}
                     <button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">В сравнение</span></button>
                     <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">Быстрый просмотр</span></button>
                  </div>
               </div>
               <div className="add-to-cart">
                  <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> В корзину</button>
               </div>
            </div>
         )}
      </div>
   );
}

export default ProductListComponent;