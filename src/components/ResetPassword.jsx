import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword() {
  const location = useLocation();
  const [email] = useState(location.state?.email || "");
  const [otp] = useState(location.state?.otp || "");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8732/api/users/reset-password", null, {
        params: { email, otp, newPassword },
      });
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "white",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Reset Password
        </Typography>
        <Typography variant="body2" mb={3}>
          Set a new password for your account.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              disabled
            />
            <TextField label="OTP" required value={otp} disabled />
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default ResetPassword;
