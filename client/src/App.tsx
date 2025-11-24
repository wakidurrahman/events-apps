import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;
