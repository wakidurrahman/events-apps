import { useQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import ProductDialog from '../components/ProductDialog';
import { GET_PRODUCTS } from '../graphql/queries';

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

  const columnDefs = [
    { field: 'product_id', headerName: 'ID', width: 100 },
    { field: 'product_name', headerName: 'Product Name', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
    },
    { field: 'stock_quantity', headerName: 'Stock', width: 120 },
    {
      field: 'category.category_name',
      headerName: 'Category',
      width: 150,
    },
    {
      headerName: 'Actions',
      width: 150,
      cellRenderer: (params: any) => (
        <Button size="small" onClick={() => handleEdit(params.data)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>
      </Box>

      <Box className="ag-theme-material" sx={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={data?.products || []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="normal"
        />
      </Box>

      <ProductDialog
        open={open}
        product={selectedProduct}
        onClose={handleClose}
      />
    </Box>
  );
};

export default ProductsPage;
