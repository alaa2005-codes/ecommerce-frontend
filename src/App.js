import HomePage from "./Page/Home/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBarLogin from "./Components/Uitily/NavBarLogin";
import Footer from "./Components/Uitily/Footer";
import LoginPage from './Page/Auth/LoginPage';
import RegisterPage from "./Page/Auth/RegisterPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetalisPage from "./Page/Products/ProductDetalisPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethoudPage from "./Page/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./Page/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "./Page/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Page/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage";
import AdminUsersPage from './Components/Admin/AdminUsersPage';
import UserAllOrdersPage from "./Page/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "./Page/User/UserFavoriteProductsPage";
import UserAllAddresPage from './Page/User/UserAllAddresPage';
import UserAddAddressPage from './Page/User/UserAddAddressPage';
import UserEditAddressPage from './Page/User/UserEditAddressPage';
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from './Page/Admin/AdminEditProductsPage';
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordPage";
import RsetPasswordPage from "./Page/Auth/ResetPasswordPage";
import ProtectedRoute from './Components/Uitily/ProtectedRoute';

function App() {
  return (
    <div className="font" >
      <BrowserRouter>
        <NavBarLogin />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['user']}><CartPage /></ProtectedRoute>} />
          <Route path="/order/paymethoud" element={<ProtectedRoute allowedRoles={['user']}><ChoosePayMethoudPage /></ProtectedRoute>} />
          <Route path="/admin/allproducts" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAllProductsPage /></ProtectedRoute>} />
          <Route path="/admin/allorders" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAllOrdersPage /></ProtectedRoute>} />
          <Route path="/admin/orders/:id" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminOrderDetalisPage /></ProtectedRoute>} />
          <Route path="/admin/addbrand" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAddBrandPage /></ProtectedRoute>} />
          <Route path="/admin/addcategory" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAddCategoryPage /></ProtectedRoute>} />
          <Route path="/admin/addsubcategory" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAddSubCategoryPage /></ProtectedRoute>} />
          <Route path="/admin/addproduct" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAddProductsPage /></ProtectedRoute>} />
          <Route path="/admin/addcoupon" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminAddCouponPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/user/allorders" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserAllOrdersPage /></ProtectedRoute>} />
          <Route path="/user/favoriteproducts" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserFavoriteProductsPage /></ProtectedRoute>} />
          <Route path="/user/addresses" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserAllAddresPage /></ProtectedRoute>} />
          <Route path="/user/add-address" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserAddAddressPage /></ProtectedRoute>} />
          <Route path="/user/edit-address" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserEditAddressPage /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['user', 'manager', 'admin']}><UserProfilePage /></ProtectedRoute>} />
          <Route path="/admin/editproduct/:id" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><AdminEditProductsPage /></ProtectedRoute>} />
          <Route path="/user/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<RsetPasswordPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;