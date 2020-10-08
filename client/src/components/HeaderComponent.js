import React, { useContext } from 'react';
import logo from '../templates/img/logo.png';
import { phone, adress, salesEmail } from '../includes/basics';
import { ConfigContext } from '../context/ConfigContext';
import { CategoriesContext } from '../context/CategoriesContext';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
   const config = useContext( ConfigContext );
   const [ categories ] = useContext( CategoriesContext );
   
   return (
      <header>
         <div id="top-header">
            <div className="container">
               <ul className="header-links pull-left">
                  <li><a href="#"><i className="fa fa-phone"></i> {phone}</a></li>
                  <li><a href="#"><i className="fa fa-envelope-o"></i> {salesEmail}</a></li>
                  <li><a href="#"><i className="fa fa-map-marker"></i> {adress}</a></li>
               </ul>
               <ul className="header-links pull-right">
                  <li>
                     <a href="http://localhost:8081/admin" target="_blank"><i className="fa fa-user-o"></i> Admin Panel</a>
                  </li>
               </ul>
            </div>
         </div>
         
         <div id="header">
            <div className="container">
               <div className="row">
                  <div className="col-md-3">
                     <div className="header-logo">
                        <Link to="/" className="logo">
                           <img src={logo} alt="Electro"/>
                        </Link>
                     </div>
                  </div>
                  
                  <div className="col-md-6">
                     <div className="header-search">
                        <form className="d-flex">
                           <select className="input-select">
                              <option value="0">Все категории</option>
                              {categories.map( category => (
                                 <option key={`cat-${category._id}`} value={category._id}>{category.title}</option>
                              ) )}
                           </select>
                           <input className="input" placeholder="Начать поиск..."/>
                           <button type="button" className="search-btn">
                              Поиск
                           </button>
                        </form>
                     </div>
                  </div>
                  
                  <div className="col-md-3 clearfix">
                     <div className="header-ctn">
                        {config.enable_wishlist ? (
                           <div>
                              <a href="#">
                                 <i className="fa fa-heart-o"></i>
                                 <span>Ожидания</span>
                              </a>
                           </div>
                        ) : (
                           ''
                        )}
                        
                        <div className="dropdown">
                           <Link to="/cart"><i className="fa fa-shopping-cart"></i> <span>Корзина</span></Link>
                        </div>
                        
                        <div className="menu-toggle">
                           <a href="#">
                              <i className="fa fa-bars"></i>
                              <span>Menu</span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default HeaderComponent;
