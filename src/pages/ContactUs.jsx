import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const contactInfo = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Address',
    content: '123 Business Street, Suite 100\nNew York, NY 10001',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Phone',
    content: '+1 (555) 123-4567\n+1 (555) 123-4568',
  },
  {
    icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Email',
    content: 'info@company.com\nsupport@company.com',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Working Hours',
    content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
  },
];

export default function ContactUs() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 8,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Have questions? We're here to help. Get in touch with us through any of these channels.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard>
                <CardContent sx={{ textAlign: 'center' }}>
                  {info.icon}
                  <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                    {info.content}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form */}
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Send Us a Message
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 2 }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Map Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Location
          </Typography>
          <Box
            sx={{
              height: 400,
              width: '100%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Map will be displayed here
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 