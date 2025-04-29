import { Box, Button, TextField, Typography, Stack, CircularProgress } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8732/api/users/forgot-password",
        null,
        { params: { email } }
      );
      toast.success("OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ p: 4, borderRadius: 3, boxShadow: 3, bgcolor: "white", maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>Forgot Password</Typography>
        <Typography variant="body2" mb={3}>Enter your email to receive an OTP for password reset.</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
