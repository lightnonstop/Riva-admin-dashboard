import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCategoryList from './pages/BlogCategoryList';
import Orders from './pages/Orders';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
					<Route path='enquiries' element={<Enquiries />} />
					<Route path='blog-list' element={<BlogList />} />        
					<Route path='blog-category-list' element={<BlogCategoryList />} />
					<Route path='orders' element={<Orders />} />
			</Route>
      </Routes>
    </Router>
  );
}

export default App;
