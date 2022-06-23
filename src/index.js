import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products/Products'; 
import Baskets from './Pages/Baskets/Baskets';
import Favourites from './Pages/Favourites/Favourites';

if (process.env.NODE_ENV === 'production') {
  console.error = () => {}
  console.debug = () => {}
  console.warn = () => {}
  console.log = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="" element={<Products />} />
        <Route path="/basket" element={<Baskets />} />
        <Route path='/favourites' element={<Favourites />} />
      </Route>
      </Routes>
    </Router>
);
 