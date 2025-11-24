import { useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT } from '../graphql/queries';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId: id },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const product = data?.product;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {product?.product_name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Typography paragraph>{product?.description}</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Chip label={`Price: $${product?.price}`} color="primary" />
                <Chip label={`Stock: ${product?.stock_quantity}`} />
                <Chip label={product?.category?.category_name} />
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>
            {product?.reviews?.map((review: any) => (
              <Card key={review.review_id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">
                      {review.customer.first_name} {review.customer.last_name}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.review_text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Purchase Information
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                ${product?.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Stock: {product?.stock_quantity} units
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;
