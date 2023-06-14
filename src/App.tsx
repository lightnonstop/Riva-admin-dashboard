import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddBlog, AddBlogCategory, AddColor, BlogCategoryList, BlogList, BrandList, CategoryList, ColorList, Customers, Dashboard, Enquiries, ForgotPassword, Login, Orders, ProductList, ResetPassword } from './pages';
import { MainLayout } from './components';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
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
					<Route path='blog-category' element={<AddBlogCategory />} />
					<Route path='orders' element={<Orders />} />
					<Route path='color-list' element={<ColorList />} />
					<Route path='color' element={<AddColor />} />
					<Route path='customers' element={<Customers />} />
					<Route path='category-list' element={<CategoryList />} />
					<Route path='category' element={<AddCategory />} />
					<Route path='brand-list' element={<BrandList />} />
					<Route path='brand' element={<AddBrand />} />
					<Route path='product-list' element={<ProductList />} />
					<Route path='product' element={<AddProduct />} />
					<Route path='blog' element={<AddBlog />} />
			</Route>
      </Routes>
    </Router>
  );
}

export default App;
