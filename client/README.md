# Shop Shine Client

React frontend for the Shop Shine e-commerce application with Material-UI, Apollo Client, and AG-Grid.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI** - Component library
- **Apollo Client** - GraphQL client
- **AG-Grid** - Data grid
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Router** - Routing

## Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure the API server is running on `http://localhost:4000`

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Layout.tsx
│   └── ProductDialog.tsx
├── pages/           # Page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CustomersPage.tsx
│   ├── OrdersPage.tsx
│   └── CartPage.tsx
├── graphql/         # GraphQL queries and mutations
│   ├── queries.ts
│   └── mutations.ts
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Features

### Home Page

- Welcome screen with quick navigation
- Feature cards for main sections
- About information

### Products Page

- AG-Grid table with all products
- Create, edit, and delete products
- Form validation with React Hook Form and Zod
- Real-time updates with Apollo Client

### Product Detail Page

- Detailed product information
- Customer reviews with ratings
- Category information

### Customers Page

- AG-Grid table with customer information
- View all customer details

### Orders Page

- AG-Grid table with order information
- Status indicators with color coding
- Customer information display

### Shopping Cart

- Cart page (placeholder for future implementation)

## Form Validation

Forms use React Hook Form with Zod schema validation:

```typescript
const productSchema = z.object({
  product_name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock_quantity: z.number().int().min(0, 'Stock must be non-negative'),
  category_id: z.number().optional(),
});
```

## GraphQL Integration

Apollo Client is configured to connect to the GraphQL API:

```typescript
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
```

## Styling

Material-UI provides:

- Consistent design system
- Responsive layout
- Theme customization
- Pre-built components

## AG-Grid

Data tables use AG-Grid for:

- Sorting and filtering
- Pagination
- Custom cell renderers
- High performance with large datasets
