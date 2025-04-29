import { CssBaseline } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreditScoreCheck from "./pages/CreditScoreCheck.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import LoanApplication from "./pages/LoanApplication.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FooterSection from "./components/FooterSection.jsx";
import UserDocuments from "./components/UserDocuments";
import Services from "./pages/Services.jsx";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

// ADD THESE IMPORTS:
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        {/* Password Recovery Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Credit Score Check */}
        <Route path="/credit-score" element={<CreditScoreCheck />} />
        {/* Loan Application (USER only) */}
        <Route
          path="/apply-loan"
          element={
            <ProtectedRoute roleRequired="USER">
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        {/* Main Dashboard (any authenticated user) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roleRequired="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* User Documents */}
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <UserDocuments
                userId={JSON.parse(localStorage.getItem("user") || "{}").id}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <FooterSection />
      <ToastContainer />
    </Router>
  );
}

export default App;