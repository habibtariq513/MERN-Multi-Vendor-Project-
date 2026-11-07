import { Navigate, Route, Routes } from "react-router-dom";
import { ActivationPage, HomePage, LoginPage, SignupPage } from "./Routes.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route
        path="/activation/:activation_token"
        element={<ActivationPage />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
