import { Box, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ServiceCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 94, 184, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 94, 184, 0.2)",
  },
}));

const services = [
  {
    title: "Professional Loans",
    description: "Tailored financing solutions for doctors, engineers, architects, and other professionals.",
    icon: <BusinessCenterIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Education Loans",
    description: "Support for higher education, professional courses, and skill development programs.",
    icon: <SchoolIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Medical Equipment Loans",
    description: "Financing for medical practitioners to upgrade their equipment and facilities.",
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Construction Equipment Loans",
    description: "Funding for construction professionals to purchase or upgrade their equipment.",
    icon: <EngineeringIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Commercial Vehicle Loans",
    description: "Loans for purchasing commercial vehicles for business operations.",
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Business Expansion Loans",
    description: "Financial support for business expansion, working capital, and infrastructure development.",
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#005bea" }} />,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Services() {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        py: 8,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              color: "#005bea",
              fontWeight: 800,
              mb: 4,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 3,
                backgroundColor: "#00c6fb",
              },
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#4f5b7c",
              mb: 8,
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Discover our comprehensive range of financial solutions designed to support your professional and business growth.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {service.icon}
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          ml: 2,
                          fontWeight: 700,
                          color: "#005bea",
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 