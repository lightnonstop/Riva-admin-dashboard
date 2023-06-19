import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddBlogCategory, AddColor, Blogs, Brands, ProductCategories, Colors, Customers, Dashboard, Enquiries, ForgotPassword, Login, Orders, Products, ResetPassword, AddProductCategory, AddProduct, AddCoupon, Coupons, AddBrand, BlogCategories, AddBlog, ViewOrder, ViewEnquiry } from './pages';
import { MainLayout } from './components';
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
					<Route path='enquiry/:id' element={<ViewEnquiry />} />
					<Route path='blogs' element={<Blogs />} />
					<Route path='blog-categories' element={<BlogCategories />} />
					<Route path='add-blog-category' element={<AddBlogCategory />} />
					<Route path='blog-category/:id' element={<AddBlogCategory />} />
					<Route path='orders' element={<Orders />} />
					<Route path='order/:id' element={<ViewOrder />} />
					<Route path='colors' element={<Colors />} />
					<Route path='add-color' element={<AddColor />} />
					<Route path='color/:id' element={<AddColor />} />
					<Route path='customers' element={<Customers />} />
					<Route path='product-categories' element={<ProductCategories />} />
					<Route path='add-product-category' element={<AddProductCategory />} />
					<Route path='product-category/:id' element={<AddProductCategory />} />
					<Route path='brands' element={<Brands />} />
					<Route path='add-brand' element={<AddBrand />} />
					<Route path='brand/:id' element={<AddBrand />} />
					<Route path='products' element={<Products />} />
					<Route path='add-product' element={<AddProduct />} />
					<Route path='add-blog' element={<AddBlog />} />
					<Route path='blog/:id' element={<AddBlog />} />
					<Route path='add-coupon' element={<AddCoupon />} />
					<Route path='coupon/:id' element={<AddCoupon />} />
					<Route path='coupons' element={<Coupons />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
