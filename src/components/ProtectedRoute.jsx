import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  // Try to get user info from localStorage
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
    console.log("ProtectedRoute user:", user);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user");
  }

  // If user info not present, check for JWT token
  let token = localStorage.getItem("jwtToken");
  let tokenValid = false;
  let tokenRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Check for expiration
      if (!decoded.exp || decoded.exp * 1000 > Date.now()) {
        tokenValid = true;
        tokenRole =
          decoded.role || decoded.authorities || decoded.roles || null;
      }
    } catch (e) {
      tokenValid = false;
    }
  }

  // If neither user nor valid token, redirect to login
  if ((!user || (!user.name && !user.email)) && !tokenValid) {
    console.warn("No valid user or token, redirecting to login");
    return <Navigate to="/login" />;
  }

  // Check role if required (prefer user, fallback to token)
  const effectiveRole = user?.role || tokenRole;
  if (roleRequired && effectiveRole !== roleRequired) {
    console.warn(
      `Role ${effectiveRole} does not match required ${roleRequired}, redirecting to home`
    );
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
