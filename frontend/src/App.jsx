import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import store from "./redux/store.js";
import { loadSeller } from "./redux/actions/seller.js";
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
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
  SignupPage,
} from "./Routes.js";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadSeller());
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
        path="/product/:name"
        element={<ProductDetailsPage />}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CheckoutPage />
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
        path="/shop/:id"
        element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
