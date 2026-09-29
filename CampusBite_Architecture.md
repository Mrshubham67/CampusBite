# CampusBite — MERN Application Architecture

## 1. Project Overview

**CampusBite** is a modern college canteen ordering application built with the MERN stack.

### User Roles

- **Student** — browse food, manage cart, place orders, track orders, review food.
- **Admin/Canteen Staff** — manage food, categories, orders, offers and basic statistics.

---

## 2. Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Context API
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- Mongoose
- JWT authentication
- bcryptjs
- dotenv
- CORS
- Request validation

### Database
- MongoDB / MongoDB Atlas

### Deployment
- Frontend: Vercel or Render
- Backend: Render
- Database: MongoDB Atlas

---

## 3. High-Level Architecture

```text
                    CAMPUSBITE
                        |
            +-----------+-----------+
            |                       |
       STUDENT APP             ADMIN PANEL
            |                       |
            +-----------+-----------+
                        |
                 React Frontend
                        |
                 Context / State
                        |
                     Axios
                        |
                   REST API
                        |
                Express + Node.js
                        |
                    Mongoose
                        |
                    MongoDB
```

---

## 4. Project Structure

```text
campusbite/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Brand/Brand.jsx + Brand.css
│       │   ├── Footer/Footer.jsx + Footer.css
│       │   ├── Navbar/Navbar.jsx + Navbar.css
│       │   ├── ProtectedRoute/ProtectedRoute.jsx + ProtectedRoute.css
│       │   └── SiteLayout/SiteLayout.jsx + SiteLayout.css
│       │
│       ├── pages/
│       │   ├── AdminPage/AdminPage.jsx + AdminPage.css
│       │   ├── AuthPage/AuthPage.jsx + AuthPage.css
│       │   ├── HomePage/HomePage.jsx + HomePage.css
│       │   ├── MenuPage/MenuPage.jsx + MenuPage.css
│       │   └── NotFoundPage/NotFoundPage.jsx + NotFoundPage.css
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── CartContext.jsx
│       │   └── AppContext.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   └── authApi.js
│       ├── routes/
│       ├── hooks/
│       ├── utils/
│       ├── App.jsx
│       ├── main.jsx
│       └── global.css
│
├── server/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── foodController.js
│   │   └── healthController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Food.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── foodRoutes.js
│   │   └── healthRoutes.js
│   ├── utils/
│   ├── seed/
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

# 5. Student Application Pages

## Home

- Hero section
- Search bar
- Food categories
- Popular foods
- Today's offers
- Recommended foods
- How it works
- Footer

## Menu

- Search
- Category filtering
- Veg/non-veg filtering
- Price filtering
- Sorting
- Availability
- Food cards

## Food Details

- Food image
- Description
- Price
- Rating
- Preparation time
- Customization options
- Quantity selector
- Add to cart
- Favorite

## Cart

- Cart items
- Quantity controls
- Remove item
- Coupon
- Subtotal
- Discount
- Final total

## Checkout

- Order summary
- Pickup time
- Payment method
- Coupon
- Place order

Initial payment option:

```text
Pay at Counter
```

Real payment integration can be added later.

## Orders

- Active orders
- Completed orders
- Cancelled orders
- Order details
- Order status timeline

## Profile

- Personal information
- Favorites
- Order history
- Reviews
- Account settings

---

# 6. Admin Application

## Dashboard

Display:

- Today's orders
- Today's revenue
- Pending orders
- Available food items
- Recent orders
- Popular food
- Order status statistics

## Food Management

Admin can:

- Add food
- Edit food
- Delete food
- Change price
- Change availability
- Upload food image
- Mark food as popular

## Category Management

Admin can:

- Add category
- Edit category
- Delete category
- Activate/deactivate category

## Order Management

Admin can:

- View orders
- Confirm orders
- Mark preparing
- Mark ready
- Mark completed
- Cancel orders

## Offer Management

Admin can:

- Create offers
- Create coupon codes
- Edit offers
- Disable offers
- Set expiry dates

---

# 7. Database Architecture

## User

```js
{
  _id,
  name,
  email,
  passwordHash,
  role,
  phone,
  createdAt,
  updatedAt
}
```

Roles:

```text
user
admin
```

## Category

```js
{
  _id,
  name,
  description,
  image,
  isActive,
  createdAt,
  updatedAt
}
```

## Food

```js
{
  _id,
  name,
  description,
  price,
  image,
  category,
  isVeg,
  rating,
  reviewCount,
  preparationTime,
  isAvailable,
  isPopular,
  customizationOptions: [],
  createdAt,
  updatedAt
}
```

## Order

```js
{
  _id,
  orderNumber,
  user,
  items: [],
  subtotal,
  discount,
  totalAmount,
  couponCode,
  pickupTime,
  paymentMethod,
  paymentStatus,
  orderStatus,
  createdAt,
  updatedAt
}
```

### Order Status

```text
placed
confirmed
preparing
ready
completed
cancelled
```

## Review

```js
{
  _id,
  user,
  food,
  order,
  rating,
  comment,
  createdAt,
  updatedAt
}
```

## Offer

```js
{
  _id,
  title,
  description,
  code,
  discountType,
  discountValue,
  minimumOrderValue,
  maxDiscount,
  startDate,
  expiryDate,
  isActive,
  createdAt,
  updatedAt
}
```

---

# 8. API Architecture

Base URL:

```text
/api
```

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Food

```text
GET    /api/foods
GET    /api/foods/:id
POST   /api/foods
PUT    /api/foods/:id
DELETE /api/foods/:id
PATCH  /api/foods/:id/availability
```

## Categories

```text
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

## Orders

```text
POST   /api/orders
GET    /api/orders/my-orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status
PATCH  /api/orders/:id/cancel
GET    /api/orders/admin/all
```

## Reviews

```text
GET    /api/reviews/food/:foodId
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

## Offers

```text
GET    /api/offers
POST   /api/offers
PUT    /api/offers/:id
DELETE /api/offers/:id
POST   /api/offers/validate
```

## Users

```text
GET /api/users/profile
PUT /api/users/profile
GET /api/users
```

---

# 9. Authentication

```text
Login/Register
      |
      v
Express API
      |
      v
Validate credentials
      |
      v
JWT authentication
      |
      v
Protected routes
```

Use role-based authorization:

```text
User    → Student features
Admin   → Admin features
```

Public registration always assigns `user`. Only trusted database administration may promote an account to `admin`; registration never accepts a role. Category and food write routes require a valid Bearer JWT and the current database role to be `admin`.

Passwords are hashed with bcrypt. JWTs are signed with `JWT_SECRET`, expire according to `JWT_EXPIRES_IN`, and are sent in the `Authorization: Bearer` header. The frontend keeps the token in session storage and clears it after a 401 response.

---

# 10. UI/UX Architecture

The design should feel like a **modern college food-ordering application**, not a generic CRUD project.

### Design characteristics

- Warm food-inspired visual style
- Large food images
- Rounded cards
- Subtle shadows
- Smooth hover effects
- Clear CTA buttons
- Responsive design
- Mobile-first thinking

### Suggested palette

```text
Primary: Warm Orange / Amber
Background: Cream / Off-white
Text: Dark Charcoal
Success: Green
Error: Red
```

Use centralized theme variables instead of scattering color values across components.

---

# 11. Responsive Design

Desktop:

```text
Navbar
Main Content
Sidebar/Filters
Food Grid
```

Mobile:

```text
Header
Search
Food Grid
Bottom Navigation

Home | Menu | Cart | Orders | Profile
```

---

# 12. Security Architecture

- Hash passwords
- JWT authentication
- Protected routes
- Admin authorization
- Validate request data
- Use environment variables
- Secure MongoDB credentials
- Centralized error handling
- Server-side order calculation
- Server-side coupon validation
- Users can access only their own orders
- Only admins can modify menu and order-management data

---

# 13. Development Architecture

Build in this order:

```text
1. Project setup
       ↓
2. Authentication
       ↓
3. Categories + Food
       ↓
4. Menu UI
       ↓
5. Cart
       ↓
6. Checkout + Orders
       ↓
7. Admin Dashboard
       ↓
8. Reviews + Favorites
       ↓
9. Offers + Coupons
       ↓
10. Testing + UI polish
       ↓
11. Deployment
```

---

# 14. MVP

The first complete working version should contain:

```text
Authentication
+
Menu
+
Food Details
+
Cart
+
Checkout
+
Orders
+
Admin Food Management
+
Admin Order Management
```

Advanced features should be added only after the MVP works correctly.

---

# 15. Future Features

Possible future upgrades:

- Online payments
- QR pickup
- Real-time order tracking with Socket.IO
- Push notifications
- AI food recommendations
- AI canteen chatbot
- Student wallet
- Loyalty points
- Inventory management
- Advanced analytics
- Multiple campus canteens
