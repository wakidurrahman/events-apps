import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, Typography } from '@mui/material';

const CartPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCartIcon
            sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add products to your cart to see them here
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartPage;
