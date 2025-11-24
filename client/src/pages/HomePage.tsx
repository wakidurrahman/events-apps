import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      title: 'Products',
      description: 'Browse and manage product catalog',
      icon: <StorefrontIcon sx={{ fontSize: 60 }} />,
      link: '/products',
      color: '#1976d2',
    },
    {
      title: 'Customers',
      description: 'View and manage customer information',
      icon: <PeopleIcon sx={{ fontSize: 60 }} />,
      link: '/customers',
      color: '#2e7d32',
    },
    {
      title: 'Orders',
      description: 'Track and manage orders',
      icon: <ShoppingBagIcon sx={{ fontSize: 60 }} />,
      link: '/orders',
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Shop Shine
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your complete e-commerce management solution
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: feature.color, mb: 2 }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography mb={2} color="text.secondary">
                  {feature.description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={feature.link}
                  variant="contained"
                  sx={{ bgcolor: feature.color }}
                >
                  View {feature.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          About Shop Shine
        </Typography>
        <Typography color="text.secondary" paragraph>
          Shop Shine is a modern e-commerce platform built with cutting-edge
          technologies including React, Material-UI, GraphQL, and MySQL. This
          application demonstrates best practices in full-stack development with
          a focus on user experience and performance.
        </Typography>
        <Typography color="text.secondary">
          Features include product management, customer tracking, order
          processing, and real-time inventory updates.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
