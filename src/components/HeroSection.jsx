import { Box, Button, Container, Grid, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GradientButton } from "./StyledComponents";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BoltIcon from "@mui/icons-material/Bolt";
import { styled } from "@mui/material/styles";

// Overlay for better text visibility
const HeroOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(120deg,rgba(0,63,136,0.7) 0%,rgba(0,87,202,0.4) 100%)",
  zIndex: 1,
});

// Glassy card for text
const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.15)",
  borderRadius: 24,
  boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.18)",
  padding: theme.spacing(5, 4),
  zIndex: 2,
  position: "relative",
}));

const HighlightBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.18)",
  borderRadius: 16,
  padding: "8px 18px",
  marginRight: 12,
  marginBottom: 12,
  color: "#fff",
  fontWeight: 600,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  fontSize: "1.05rem",
  transition: "background 0.2s",
  "&:hover": {
    background: "rgba(255,255,255,0.28)",
  },
});

const heroContent = [
  {
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", // Modern online banking
    title: "Banking for Professionals",
    subtitle: "Empower Your Ambitions with Trusted Finance",
    description:
      "Experience next-gen banking for your business. Fast, secure, and fully digital professional loans from Sundaram Finance. Grow your practice or business with confidence.",
    highlights: [
      {
        icon: <BoltIcon color="primary" />,
        label: "Instant Digital Approvals",
      },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "100% Secure & Compliant",
      },
      { icon: <TrendingUpIcon color="info" />, label: "Flexible Repayment" },
      {
        icon: <ShieldIcon color="secondary" />,
        label: "Trusted by 1M+ Businesses",
      },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1518544801346-3df1c7b2b2e2?auto=format&fit=crop&w=1200&q=80", // Mobile banking app in hand
    title: "Seamless Digital Experience",
    subtitle: "Apply, Track, and Manage Online",
    description:
      "No paperwork, no branch visits. Apply for loans, upload documents, and track your application—all from your dashboard.",
    highlights: [
      { icon: <BoltIcon color="primary" />, label: "Paperless Process" },
      { icon: <TrendingUpIcon color="info" />, label: "Real-Time Status" },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "Personalized Support",
      },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // Secure digital transaction, card and padlock
    title: "Transparent. Reliable. Modern.",
    subtitle: "Banking You Can Trust",
    description:
      "No hidden fees. No surprises. Just clear terms, fair rates, and banking designed for tomorrow’s professionals.",
    highlights: [
      { icon: <ShieldIcon color="secondary" />, label: "Transparent Terms" },
      {
        icon: <VerifiedUserIcon color="success" />,
        label: "Regulatory Compliant",
      },
      { icon: <TrendingUpIcon color="info" />, label: "Growth-Focused" },
    ],
  },
];

export default function HeroSection() {
  const [currentHero, setCurrentHero] = useState(0);
  const [direction, setDirection] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user.role || null;

  useEffect(() => {
    if (!heroContent.length) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentHero((prev) => (prev + 1) % heroContent.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Defensive: fallback if content is empty or index is out of bounds
  if (!heroContent.length || !heroContent[currentHero]) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #eaf4ff 0%, #f6fbff 100%)",
        }}
      >
        <Typography variant="h4" color="#003f88">
          No hero content available.
        </Typography>
      </Box>
    );
  }

  const { title, subtitle, description, image, highlights } =
    heroContent[currentHero];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 600, md: 720 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.7s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      <HeroOverlay />
      <Container sx={{ position: "relative", zIndex: 2, pt: 10, pb: 8 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item xs={12} md={7} lg={6}>
            <GlassCard>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                    mb: 2,
                    textShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#e0e7ef",
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  {subtitle}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#f7fafc",
                    mb: 4,
                    lineHeight: 1.7,
                    fontWeight: 400,
                    textShadow: "0 1px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  flexWrap="wrap"
                  sx={{ mb: 3 }}
                >
                  {highlights.map((h) => (
                    <HighlightBox key={h.label}>
                      {h.icon}
                      <span style={{ marginLeft: 8 }}>{h.label}</span>
                    </HighlightBox>
                  ))}
                </Stack>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {userRole !== "ADMIN" && (
                    <GradientButton
                      as={Link}
                      to="/apply-loan"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        px: 4,
                        py: 1.5,
                        boxShadow: "0 4px 16px 0 rgba(0,94,184,0.14)",
                        borderRadius: 12,
                        background:
                          "linear-gradient(90deg,#005bea 0%,#3ec6e0 100%)",
                        color: "#fff",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg,#003f88 0%,#005bea 100%)",
                        },
                      }}
                    >
                      Get Started
                    </GradientButton>
                  )}
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/contact"
                    sx={{
                      borderColor: "#fff",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: 12,
                      fontSize: "1.1rem",
                      px: 4,
                      py: 1.5,
                      background: "rgba(255,255,255,0.07)",
                      "&:hover": {
                        borderColor: "#e0e7ef",
                        backgroundColor: "rgba(255,255,255,0.17)",
                        color: "#e0e7ef",
                      },
                    }}
                  >
                    Talk to a Banking Advisor
                  </Button>
                </Box>
              </motion.div>
            </GlassCard>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
