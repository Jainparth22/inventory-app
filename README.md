# InventoryPro — Modern Inventory Management System

InventoryPro is a full-stack, cloud-connected Inventory Management System built for modern businesses. It streamlines procurement, sales, and manufacturing workflows with real-time inventory tracking and a premium enterprise-grade user interface.

## 🚀 Features

- **Authentication System**: Secure JWT-based authentication using edge-compatible middleware.
- **Product Management**: Track products, prices, quantities, and weights.
- **Sales Orders**: Full sales pipeline (Quotation → Packing → Dispatch → Complete). Stock is automatically deducted upon dispatch.
- **Purchase Orders**: Full procurement pipeline (Received → Unpaid → Paid → Complete). Stock is automatically added upon completion.
- **Manufacturing (WIP)**: Track active manufacturing batches. Deduct raw materials when a batch starts and add output products to inventory when completed.
- **Dashboard & Analytics**: Real-time summary metrics, low stock alerts, and recent order tracking.
- **Export Capabilities**: Export filtered order and manufacturing history to CSV.
- **Responsive UI**: Master-detail layouts, color-coded status badges, and dynamic data tables.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma v6
- **Styling**: Vanilla CSS (Custom Enterprise Design System)
- **Authentication**: `jose` (Edge-compatible JWT)
- **Icons**: Lucide React

## 📦 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   The project uses SQLite. Generate the Prisma client and push the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Demo Data:**
   Populate the database with realistic products, customers, suppliers, and orders:
   ```bash
   npx prisma db seed
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## 🔐 Credentials
Use the following default credentials to log in:
- **Username**: `admin`
- **Password**: `admin123`

## 🏗 Architecture & Design Decisions

- **Edge Middleware**: We used `jose` instead of `jsonwebtoken` to ensure edge compatibility for Next.js middleware, allowing for instant redirect routing before page load.
- **Master-Detail UI**: Followed classic enterprise patterns to allow fast browsing on the left pane with detailed contextual actions on the right.
- **Automatic Inventory Reconciliation**: Rather than requiring manual stock updates, stock amounts are recalculated automatically when order states advance using Prisma transactions.

## 📄 License
MIT
