import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products/Products';
import Login from './Pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="" element={<Products />} />
      </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
);
 