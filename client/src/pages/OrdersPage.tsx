import { useQuery } from '@apollo/client';
import { Alert, Box, Chip, CircularProgress, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { GET_ORDERS } from '../graphql/queries';

const OrdersPage = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const columnDefs = [
    { field: 'order_id', headerName: 'Order ID', width: 120 },
    {
      field: 'order_date',
      headerName: 'Order Date',
      width: 180,
      valueFormatter: (params: any) =>
        new Date(parseInt(params.value)).toLocaleDateString(),
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      valueGetter: (params: any) =>
        `${params.data.customer?.first_name} ${params.data.customer?.last_name}`,
    },
    { field: 'customer.email', headerName: 'Email', flex: 1 },
    {
      field: 'total_amount',
      headerName: 'Total',
      width: 120,
      valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      cellRenderer: (params: any) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>

      <Box className="ag-theme-material" sx={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={data?.orders || []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="normal"
        />
      </Box>
    </Box>
  );
};

export default OrdersPage;
