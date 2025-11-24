import { useQuery } from '@apollo/client';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { GET_CUSTOMERS } from '../graphql/queries';

const CustomersPage = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  const columnDefs = [
    { field: 'customer_id', headerName: 'ID', width: 100 },
    { field: 'first_name', headerName: 'First Name', flex: 1 },
    { field: 'last_name', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 100 },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Customers
      </Typography>

      <Box className="ag-theme-material" sx={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={data?.customers || []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="normal"
        />
      </Box>
    </Box>
  );
};

export default CustomersPage;
