# **📌 Full-Stack E-Commerce Apps**

Create a full-stack project with **three main folders**: `api`, `database`, and `client`.

---

## **📁 Folder Structure Requirements**

### **1. api/**

Responsible for backend API logic, DB connection, and CRUD operations.

**Requirements:**

- Use **Node.js**, **TypeScript**, **Knex**, **MySQL**, **GraphQL**, **Apollo Server**, **dotenv**, **Jest**.
- Create an `.env` file containing:

  - `DB_HOST=localhost`
  - `DB_USER=root`
  - `DB_PASSWORD=`
  - `DB_NAME=shop_shine`

- Set up MySQL connection using Knex.
- Implement basic **CRUD operations** for:

## Design Schema

Our `shop_shine` e-commerce system will have these tables:

    - `customers`: Store customer information
    - `products`: Store product catalog
    - `categories`: Product categories
    - `orders`: Customer orders
    - `order_items`: Items in each order
    - `payments`: Payment information
    - `reviews`: Product reviews

- Expose all CRUD operations via **GraphQL** resolvers.
- Use proper folder structure:

  ```
  api/
    src/
      config/
      db/
      graphql/
        resolvers/
        schemas/
      services/
      routes/
      utils/
    tests/
    .env
    knexfile.ts
  ```

**Notes:**

- Follow reference DB document for table structure. [beginner-friendly-mysql](./mysql/beginner-friendly-mysql.md)
- Use Knex for all SQL queries (no raw SQL).
- Include Jest test examples for CRUD ignoor for now.

---

### **2. database/**

Handles DB schema, migrations, seeds.

**Requirements:**

- Use **Knex** for:

  - Creating tables (`up`)
  - Dropping tables (`down`)
  - Managing migrations

- Create a `.env` file to manage DB connection config.
- Example structure:

  ```
  database/
    migrations/
    seeds/
    knexfile.ts
    .env
  ```

- Add migrations for: A complete e-commerce database system called `shop_shine` with customers, orders, products, and more.

  - `customers`: Store customer information
  - `products`: Store product catalog
  - `categories`: Product categories
  - `orders`: Customer orders
  - `order_items`: Items in each order
  - `payments`: Payment information
  - `reviews`: Product reviews

---

### **3. client/**

Frontend React application.

**Requirements:**

- Use **React.js**, **Material-UI**, **React Hook Form**, **Zod**, **AG-Grid**, **GraphQL**, **Apollo Client**.
- Build an e-commerce style UI:

  - Customer login page
  - Product listing page (AG-Grid)
  - Product CRUD
  - Shopping cart page

- Validate forms using **React Hook Form + Zod**.
- Structure:

  ```
  client/
    src/
      components/
      pages/
      hooks/
      graphql/
      utils/
    .env
  ```

---

## **🌐 Tech Stack Summary**

### **Backend (api)**

- Node.js
- TypeScript
- MySQL
- Knex
- GraphQL
- Apollo Server
- dotenv
- Jest

### **Frontend (client)**

- React.js
- Material-UI
- AG-Grid
- React Hook Form + Zod
- Apollo Client
- GraphQL

### **Database**

- Knex
- MySQL (localhost, root user)

---

## **🎯 Goal**

Generate a complete project skeleton with:

- Proper folder structure
- Database migrations
- GraphQL APIs with CRUD
- React e-commerce UI
- Form validation + grid management
- Clean `.env`-driven configuration
- Reusable components and services

after build the project update root README.md file with mermaid graph TD
