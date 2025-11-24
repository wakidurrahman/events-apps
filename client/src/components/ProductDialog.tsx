import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../graphql/mutations';
import { GET_CATEGORIES } from '../graphql/queries';

const productSchema = z.object({
  product_name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock_quantity: z.number().int().min(0, 'Stock must be non-negative'),
  category_id: z.number().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductDialogProps {
  open: boolean;
  product: any;
  onClose: () => void;
}

const ProductDialog = ({ open, product, onClose }: ProductDialogProps) => {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        product_name: product.product_name,
        description: product.description || '',
        price: product.price,
        stock_quantity: product.stock_quantity,
        category_id: product.category_id,
      });
    } else {
      reset({
        product_name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        category_id: undefined,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (product) {
        await updateProduct({
          variables: {
            productId: product.product_id,
            input: data,
          },
        });
      } else {
        await createProduct({
          variables: {
            input: data,
          },
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="product_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  error={!!errors.product_name}
                  helperText={errors.product_name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="stock_quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock Quantity"
                  type="number"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  error={!!errors.stock_quantity}
                  helperText={errors.stock_quantity?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Category" fullWidth>
                  {categoriesData?.categories?.map((category: any) => (
                    <MenuItem
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {product ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductDialog;
