import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingBlock from './RatingBlock';
import { ConfigContext } from '../../context/ConfigContext';

function ProductDetailComponent() {
   const { alias } = useParams();
   const config = useContext( ConfigContext );
   const [ product, setProduct ] = useState( {} );
   const [ parent, setParent ] = useState( {} );
   const [ extra_fields, setExtraFields ] = useState( [] );
   const [ manufacturer, setManufacturer ] = useState( {} );
   
   useEffect( () => {
      axios.get( `/api/site/shop?task=product&alias=${alias}` )
         .then( res => {
            setProduct( res.data );
            setParent( res.data.parent );
            setExtraFields( res.data.extra_fields );
            setManufacturer( res.data.manufacturer );
         } )
         .catch( error => console.log( error ) );
   }, [] );
   
   return (
      <div className="section">
         <div className="container">
            <div className="row">
               
               <div className="col-md-2">
                  <div id="product-imgs">
                     <div className="product-preview">
                        <img src={product.image} alt={product.title}/>
                     </div>
                  </div>
               </div>
               
               <div className="col-md-5">
                  <div id="product-main-img">
                     <div id="product-main-img">
                        <div className="product-preview">
                           <img src={product.image} alt={product.title}/>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="col-md-5">
                  <div className="product-details">
                     <h2 className="product-name">{product.title}</h2>
                     <div>
                        <RatingBlock/>
                        <a className="review-link" href="#">10 отзывов | Оставить отзыв</a>
                     </div>
                     <div>
                        {product.new_price ?
                           <h4 className="product-price">{product.new_price}
                              <del className="product-old-price"> {product.fullprice}</del>
                           </h4> :
                           <h4 className="product-price">{product.fullprice}</h4>
                        }
                        
                        {product.count && product.count > 0 || product.unlimit
                           ? <span className="text-success"> <i className="fa fa-check"></i> В наличии</span>
                           : <span className="text-danger"> <i className="fa fa-clock-o"></i> Под заказ</span>
                        }
                     </div>
                     <p>{product.short_description}</p>
                     
                     <div className="add-to-cart">
                        <div className="qty-label">
                           Кол-во
                           <div className="input-number">
                              <input type="number" defaultValue="1"/>
                              <span className="qty-up">+</span>
                              <span className="qty-down">-</span>
                           </div>
                        </div>
                        <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> В корзину</button>
                     </div>
                     
                     <ul className="product-btns">
                        {config.enable_wishlist ?
                           <li><a href="#"><i className="fa fa-heart-o"></i> Ожидание</a></li>
                           : ''
                        }
                        <li><a href="#"><i className="fa fa-exchange"></i> Сравнение</a></li>
                     </ul>
                     
                     <ul className="product-links">
                        <li>Категория:</li>
                        <li><a href="#">{parent.title}</a></li>
                     </ul>
                     
                     <ul className="product-links">
                        <li>Поделиться:</li>
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                        <li><a href="#"><i className="fa fa-envelope"></i></a></li>
                     </ul>
                  
                  </div>
               </div>
               
               <div className="col-md-12">
                  <div id="product-tab">
                     <ul className="nav nav-pills">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#tab1">Характеристики</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#tab2">Описание</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#tab3">Отзывы (3)</a></li>
                     </ul>
                     
                     <div className="tab-content">
                        <div id="tab2" className="tab-pane fade in ">
                           <div className="row">
                              <div className="col-md-12">
                                 <div className="col-md-6" dangerouslySetInnerHTML={{ __html : product.description }}/>
                              </div>
                           </div>
                        </div>
                        
                        <div id="tab1" className="tab-pane fade in active">
                           <div className="row">
                              <div className="col-md-12">
                                 {extra_fields.map( ( ef, index ) =>
                                    <div key={index} className="col-md-6">
                                       <h5>{ef.title}</h5>
                                       <table className="table">
                                          <tbody>
                                          {ef.f.map( f =>
                                             <tr key={f._id}>
                                                <td>{f.title}</td>
                                                {Array.isArray( f.value )
                                                   ? <td>{f.value.map( v => v.title ).join( ', ' )} {f.unit ? f.unit.title : ''}</td>
                                                   : <td>{f.value} {f.unit ? f.unit.title : ''}</td>
                                                }
                                             </tr>
                                          )}
                                          </tbody>
                                       </table>
                                    </div>
                                 )}
                                 {manufacturer ?
                                    <>
                                       <hr/>
                                       <div className="col-md-6 small text-muted" dangerouslySetInnerHTML={{ __html : manufacturer.description }}/>
                                    </>
                                    : ''}
                              </div>
                           </div>
                        </div>
                        
                        <div id="tab3" className="tab-pane fade in">
                           <div className="row">
                              <div className="col-md-3">
                                 <div id="rating">
                                    <div className="rating-avg">
                                       <span>4.5</span>
                                       <div className="rating-stars">
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star-o"></i>
                                       </div>
                                    </div>
                                    <ul className="rating">
                                       <li>
                                          <div className="rating-stars">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                          </div>
                                          <div className="rating-progress">
                                             <div style={{ width : 80 + '%' }}></div>
                                          </div>
                                          <span className="sum">3</span>
                                       </li>
                                       <li>
                                          <div className="rating-stars">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-o"></i>
                                          </div>
                                          <div className="rating-progress">
                                             <div style={{ width : 60 + '%' }}></div>
                                          </div>
                                          <span className="sum">2</span>
                                       </li>
                                       <li>
                                          <div className="rating-stars">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                          </div>
                                          <div className="rating-progress">
                                             <div></div>
                                          </div>
                                          <span className="sum">0</span>
                                       </li>
                                       <li>
                                          <div className="rating-stars">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                          </div>
                                          <div className="rating-progress">
                                             <div></div>
                                          </div>
                                          <span className="sum">0</span>
                                       </li>
                                       <li>
                                          <div className="rating-stars">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                             <i className="fa fa-star-o"></i>
                                          </div>
                                          <div className="rating-progress">
                                             <div></div>
                                          </div>
                                          <span className="sum">0</span>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                              
                              <div className="col-md-6">
                                 <div id="reviews">
                                    <ul className="reviews">
                                       <li>
                                          <div className="review-heading">
                                             <h5 className="name">John</h5>
                                             <p className="date">27 DEC 2018, 8:0 PM</p>
                                             <div className="review-rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o empty"></i>
                                             </div>
                                          </div>
                                          <div className="review-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="review-heading">
                                             <h5 className="name">John</h5>
                                             <p className="date">27 DEC 2018, 8:0 PM</p>
                                             <div className="review-rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o empty"></i>
                                             </div>
                                          </div>
                                          <div className="review-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                          </div>
                                       </li>
                                       <li>
                                          <div className="review-heading">
                                             <h5 className="name">John</h5>
                                             <p className="date">27 DEC 2018, 8:0 PM</p>
                                             <div className="review-rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o empty"></i>
                                             </div>
                                          </div>
                                          <div className="review-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                          </div>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                              
                              <div className="col-md-3">
                                 <div id="review-form">
                                    <form className="review-form">
                                       <input className="input" type="text" placeholder="Your Name"/>
                                       <input className="input" type="email" placeholder="Your Email"/>
                                       <textarea className="input" placeholder="Your Review"/>
                                       <div className="input-rating">
                                          <span>Your Rating: </span>
                                          <div className="stars">
                                             <input id="star5" name="rating" value="5" type="radio"/><label htmlFor="star5"></label>
                                             <input id="star4" name="rating" value="4" type="radio"/><label htmlFor="star4"></label>
                                             <input id="star3" name="rating" value="3" type="radio"/><label htmlFor="star3"></label>
                                             <input id="star2" name="rating" value="2" type="radio"/><label htmlFor="star2"></label>
                                             <input id="star1" name="rating" value="1" type="radio"/><label htmlFor="star1"></label>
                                          </div>
                                       </div>
                                       <button className="primary-btn">Submit</button>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetailComponent;
