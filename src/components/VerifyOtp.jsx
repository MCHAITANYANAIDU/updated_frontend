import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8732/api/users/verify-otp", null, {
        params: { email, otp },
      });
      toast.success("OTP verified! Please set a new password.");
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      toast.error(error.response?.data || "Invalid or expired OTP");
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
          Verify OTP
        </Typography>
        <Typography variant="body2" mb={3}>
          Enter the OTP sent to your email.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <TextField
              label="OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default VerifyOtp;
