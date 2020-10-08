import './templates/css/font-awesome.min.css';
import './templates/css/style.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Pages
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import NotFound from './components/NotFound';
//Contexts
import { ConfigProvider } from './context/ConfigContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ManufacturersProvider } from './context/ManufacturersContext';

function App() {
   return (
      <Router>
         <Switch>
            <ConfigProvider>
               <CategoriesProvider>
                  <ManufacturersProvider>
                     <Route path="/" component={ShopPage} exact/>
                     <Route path="/product/:alias" component={ProductDetailPage}/>
                     <Route path="/cart" component={CartPage} exact/>
                  </ManufacturersProvider>
               </CategoriesProvider>
            </ConfigProvider>
            <Route component={NotFound}/>
         </Switch>
      </Router>
   );
}

export default App;
