export const ERD_TABLES = [
  {
    name: 'Customers',
    description: 'Stores customer personal and shipping details',
    columns: [
      { name: 'customer_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
      { name: 'first_name', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Customer first name' },
      { name: 'last_name', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Customer last name' },
      { name: 'email', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Unique email address' },
      { name: 'phone', type: 'VARCHAR(20)', isPK: false, isFK: false, desc: 'Contact phone number' },
      { name: 'address', type: 'TEXT', isPK: false, isFK: false, desc: 'Street address' },
      { name: 'city', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'City name' },
      { name: 'state', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'State / Province' },
      { name: 'zip_code', type: 'VARCHAR(20)', isPK: false, isFK: false, desc: 'Postal code' },
      { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Account registration date' }
    ]
  },
  {
    name: 'Categories',
    description: 'Stores product categories for grouping',
    columns: [
      { name: 'category_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
      { name: 'category_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Category display name' },
      { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Category description' }
    ]
  },
  {
    name: 'Products',
    description: 'Catalog of items available for sale',
    columns: [
      { name: 'product_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
      { name: 'category_id', type: 'INT', isPK: false, isFK: true, desc: 'FK -> Categories.category_id' },
      { name: 'product_name', type: 'VARCHAR(150)', isPK: false, isFK: false, desc: 'Laptop, Mouse, Keyboard, Monitor' },
      { name: 'price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Unit price ($)' },
      { name: 'stock_quantity', type: 'INT', isPK: false, isFK: false, desc: 'Available stock' },
      { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Product specs & details' }
    ]
  },
  {
    name: 'Orders',
    description: 'Master order transactions created by customers',
    columns: [
      { name: 'order_id', type: 'VARCHAR(30)', isPK: true, isFK: false, desc: 'PK: ORD-0001 format' },
      { name: 'customer_id', type: 'INT', isPK: false, isFK: true, desc: 'FK -> Customers.customer_id' },
      { name: 'order_date', type: 'DATETIME', isPK: false, isFK: false, desc: 'Date order was placed' },
      { name: 'shipping_method', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Free Shipping / Express' },
      { name: 'shipping_fee', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Shipping cost' },
      { name: 'subtotal_amount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Items subtotal' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Grand Total Amount' },
      { name: 'order_status', type: 'VARCHAR(30)', isPK: false, isFK: false, desc: "Default: 'Pending'" }
    ]
  },
  {
    name: 'Order_Items',
    description: 'Line items linking ordered products to each order',
    columns: [
      { name: 'order_item_id', type: 'INT', isPK: true, isFK: false, desc: 'Primary Key' },
      { name: 'order_id', type: 'VARCHAR(30)', isPK: false, isFK: true, desc: 'FK -> Orders.order_id' },
      { name: 'product_id', type: 'INT', isPK: false, isFK: true, desc: 'FK -> Products.product_id' },
      { name: 'quantity', type: 'INT', isPK: false, isFK: false, desc: 'Ordered quantity' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Unit price at purchase' },
      { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'quantity * unit_price' }
    ]
  }
];

export const ERD_RELATIONSHIPS = [
  { from: 'Categories', to: 'Products', type: '1 : N', desc: 'One Category contains many Products' },
  { from: 'Customers', to: 'Orders', type: '1 : N', desc: 'One Customer places many Orders' },
  { from: 'Orders', to: 'Order_Items', type: '1 : N', desc: 'One Order contains many Order_Items' },
  { from: 'Products', to: 'Order_Items', type: '1 : N', desc: 'One Product appears in many Order_Items' }
];

export const SQL_SCHEMA = `-- E-Commerce Database Schema for Practical Exercises
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- 1. Customers Table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 3. Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL
);

-- 4. Orders Table
CREATE TABLE Orders (
    order_id VARCHAR(30) PRIMARY KEY, -- e.g. 'ORD-0001'
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    subtotal_amount DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- 5. Order_Items Table
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
);

-- Seed Initial Products (from Practical Exercise 1)
INSERT INTO Categories (category_name, description) VALUES 
('Computers', 'Laptops and Desktops'),
('Accessories', 'Mice, Keyboards, Audio'),
('Displays', 'Monitors and screens');

INSERT INTO Products (product_name, price, stock_quantity, category_id) VALUES
('Laptop', 650.00, 20, 1),
('Mouse', 15.00, 100, 2),
('Keyboard', 25.00, 50, 2),
('Monitor', 120.00, 30, 3);
`;
