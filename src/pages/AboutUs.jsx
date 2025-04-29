import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const teamMembers = [
  {
    name: 'John Doe',
    position: 'CEO',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Jane Smith',
    position: 'CTO',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Mike Johnson',
    position: 'CFO',
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Sarah Williams',
    position: 'COO',
    image: 'https://i.pravatar.cc/150?img=4',
  },
];

const stats = [
  {
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    value: '10+',
    label: 'Years in Business',
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    value: '1000+',
    label: 'Happy Clients',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    value: '50+',
    label: 'Awards Won',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    value: '99%',
    label: 'Success Rate',
  },
];

export default function AboutUs() {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            We are a leading financial services company dedicated to providing innovative solutions
            and exceptional service to our clients.
          </Typography>
        </Box>

        {/* Mission and Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To empower individuals and businesses with accessible financial solutions,
                  helping them achieve their goals and secure their future through innovative
                  technology and personalized service.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To be the most trusted and preferred financial partner, recognized for our
                  commitment to excellence, innovation, and customer satisfaction in the
                  financial services industry.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Achievements
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledCard>
                  {stat.icon}
                  <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledCard>
                  <Avatar
                    src={member.image}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {member.position}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 