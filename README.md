# E-Commerce Flow Web Application (React.js)

គម្រោងអនុវត្តតាមលំហាត់ E-Commerce Flow ដោយប្រើប្រាស់ **React.js + Tailwind CSS + Vite**។

---

## 🚀 របៀប Run គម្រោង (How to Run)

```bash
# ១. ដំឡើង Dependencies
npm install

# ២. បើកដំណើរការ Development Server
npm run dev

# ៣. Build សម្រាប់ Production
npm run build
```

កម្មវិធីនឹងដំណើរការលើ: `http://localhost:5173/`

---

## 📋 មុខងារដែលបានបំពេញតាមលំហាត់ (Features Implemented)

### ១. Practical Exercise 1: Products & Shopping Cart
- [x] **បង្ហាញផលិតផលទាំង ៤ (Display 4 Products):**
  - **Laptop:** $650
  - **Mouse:** $15
  - **Keyboard:** $25
  - **Monitor:** $120
- [x] **បង្កើតប៊ូតុង Add to Cart:** បញ្ចូលទំនិញទៅក្នុងកន្ត្រក និងមានបង្ហាញ Badge ចំនួនទំនិញ។
- [x] **Shopping Cart Page:**
  - **View Cart:** មើលបញ្ជីទំនិញដែលបានជ្រើសរើស
  - **Update QTY:** ប៊ូតុង (+) និង (-) ដើម្បីបង្កើន/បន្ថយចំនួន
  - **Remove QTY / Item:** លុបទំនិញចេញពីកន្ត្រក
  - **Calculate Subtotal & Grand Total:** គណនាតម្លៃសរុបស្វ័យប្រវត្តិ
  - **Button Proceed to Checkout:** ដំណើរការទៅកាន់ទម្រង់ទូទាត់ប្រាក់

### ២. Practical Exercise Checkout: Checkout Form
- [x] **Customer Data Fields:**
  1. First Name
  2. Last Name
  3. Email
  4. Phone Number (រួមទាំង Prefix +855, +1, +91)
  5. Address (City, State, Zip Code, Address Description)
- [x] **Validate Required Fields:** ត្រួតពិនិត្យ validation រាល់ field ដែលចាំបាច់ (Required) រួមទាំងទម្រង់ Email និង Phone។
- [x] **Shipping Method:**
  - Free Shipping ($0.00 &middot; 7-20 Days)
  - Express Shipping ($9.00 &middot; 1-3 Days)
- [x] **Display Order Summary:** បង្ហាញទំនិញដែលបានទិញ, Subtotal, Shipping Fee, Estimated Tax។
- [x] **Calculate Grand Total:** គណនា Grand Total = Subtotal + Shipping Fee។
- [x] **Button Place Order:** ប៊ូតុងបញ្ជាក់ការបញ្ជាទិញ។
- [x] **Auto-fill Demo Data Button:** ជំនួយក្នុងការបំពេញទិន្នន័យគំរូយ៉ាងរហ័សសម្រាប់ធ្វើតេស្ត។

### ៣. Practical Exercise 3: Order Confirmation
- [x] **Message:** `Order Placed Successfully!`
- [x] **Order ID:** `ORD-0001` (លេខកូដសម្គាល់ការបញ្ជាទិញ)
- [x] **Customer Name:** ឈ្មោះពេញរបស់អតិថិជន
- [x] **Order Date:** កាលបរិច្ឆេទ និងម៉ោងជាក់ស្តែងនៃការបញ្ជាទិញ
- [x] **Ordered Products:** តារាងលម្អិតបញ្ជីទំនិញ, ចំនួន (QTY), តម្លៃរាយ (Unit Price), និងតម្លៃសរុបតាមមុខទំនិញ
- [x] **Total Amount:** ចំនួនទឹកប្រាក់សរុប (Grand Total)
- [x] **Order Status:** `Pending`
- [x] **Print Invoice & Re-order:** ប៊ូតុងបោះពុម្ពវិក្កយបត្រ និងប៊ូតុងចាប់ផ្តើមបញ្ជាទិញថ្មី

### ៤. Practical Exercise 4: Database Design (ERD)
- [x] **Interactive ERD & Schema Viewer (Task 4):**
  1. `Customers` (customer_id [PK], first_name, last_name, email, phone, address, city, state, zip_code)
  2. `Categories` (category_id [PK], category_name, description)
  3. `Products` (product_id [PK], category_id [FK], product_name, price, stock_quantity)
  4. `Orders` (order_id [PK], customer_id [FK], order_date, shipping_method, total_amount, order_status)
  5. `Order_Items` (order_item_id [PK], order_id [FK], product_id [FK], quantity, unit_price, subtotal)
- [x] **SQL DDL Schema Script:** មានកូដ SQL ពេញលេញ និងប៊ូតុង Copy ងាយស្រួលប្រើប្រាស់។

---

## 📁 រចនាសម្ព័ន្ធ Project (Project Structure)

```
c:\Users\ADMIN\Desktop\EC-Code Lerning\
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   ├── products.js       # ទិន្នន័យផលិតផលទាំង ៤ និងជម្រើស Shipping
    │   └── erdData.js        # ទិន្នន័យ ERD Tables & SQL Schema
    └── components/
        ├── Navbar.jsx        # Navigation bar & Cart badge
        ├── StepProgress.jsx  # Step tracker (Products -> Cart -> Checkout -> Confirmation)
        ├── ProductList.jsx   # Exercise 1: Products list & Add to Cart
        ├── ShoppingCart.jsx  # Exercise 1: Cart management & Subtotal/Total
        ├── CheckoutForm.jsx  # Exercise 2: Customer checkout form & validation
        ├── OrderConfirmation.jsx # Exercise 3: Order Confirmation screen
        └── ErdView.jsx       # Exercise 4: Database ERD & SQL code generator
```
