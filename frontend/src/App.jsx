import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import store from "./redux/store.js";
import { loadSeller } from "./redux/actions/seller.js";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import { loadUser } from "./redux/actions/user.js";
import {
  ActivationPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  ProductsPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
  SignupPage,
} from "./Routes.js";
import {
  ShopAllProductsPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopCreateProductPage,
  ShopCreateEventsPage,
  ShopDashboardPage,
} from "./ShopRoutes.js";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route
        path="/activation/:activation_token"
        element={<ActivationPage />}
      />
      <Route path="/best-selling" element={<BestSellingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route
        path="/product/:id"
        element={<ProductDetailsPage />}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route path="/shop-create" element={<ShopCreatePage />} />
      <Route
        path="/seller/activation/:activation_token"
        element={<SellerActivationPage />}
      />
      <Route path="/shop-login" element={<ShopLoginPage />} />
      <Route
        path="/shop/preview/:id"
        element={<ShopHomePage isOwner={false} />}
      />
      <Route
        path="/shop/:id"
        element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-create-product"
        element={
          <SellerProtectedRoute>
            <ShopCreateProductPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-products"
        element={
          <SellerProtectedRoute>
            <ShopAllProductsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-create-event"
        element={
          <SellerProtectedRoute>
            <ShopCreateEventsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-events"
        element={
          <SellerProtectedRoute>
            <ShopAllEventsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-coupons"
        element={
          <SellerProtectedRoute>
            <ShopAllCouponsPage />
          </SellerProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
