# InventoryPro — Modern Inventory Management System

InventoryPro is a full-stack, cloud-connected Inventory Management System built for SMEs. It streamlines procurement, sales, and manufacturing workflows with real-time inventory tracking, data visualization, and a premium enterprise-grade user interface.

## 🌐 Live Demo

**Production URL**: *(Add your Vercel URL here)*
**GitHub**: https://github.com/Jainparth22/inventory-app

**Login Credentials**: `admin` / `admin123`

## 🚀 Features

### Core Modules
- **Product Management**: Track products with codes, prices, quantities, weights, and descriptions. Sortable columns and low-stock reorder alerts.
- **Sales Orders**: Full pipeline — Quotation → Packing → Dispatch → Complete. Stock auto-deducted on dispatch.
- **Purchase Orders**: Full pipeline — Received → Unpaid → Paid → Complete. Stock auto-added on completion.
- **Manufacturing (WIP)**: Track active batches. Raw materials deducted on start, outputs added on completion.
- **Order History**: Filtered views for sales, purchases, and manufacturing with CSV export.

### Dashboard & Analytics
- Quick Access panel for instant navigation
- Real-time stat cards (inventory value, sales revenue, purchase costs, active WIP)
- Interactive bar charts (Stock Levels, Top Products by Value)
- Donut chart (Sales Status Distribution)
- Live Activity Feed

### UI/UX Enhancements
- 🌙 **Dark Mode** — Toggle with persistence (localStorage)
- ⌨️ **Keyboard Shortcuts** — Alt+D (Dashboard), Alt+P (Products), Alt+S (Sales), Alt+U (Purchases), Alt+M (Manufacturing), Alt+H (History), Alt+T (Toggle theme)
- 🖨️ **Print** — Print-optimized views for orders and products
- ⚠️ **Low-Stock Alerts** — Visual indicators when stock drops below 50 units
- 🔐 **Authentication** — JWT-based login with edge middleware protection

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Database | PostgreSQL (Neon — serverless) |
| ORM | Prisma v6 |
| Charts | Recharts |
| Styling | Vanilla CSS (Custom Design System) |
| Auth | jose (Edge-compatible JWT) |
| Icons | Lucide React |
| Hosting | Vercel |

## 📦 Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/Jainparth22/inventory-app.git
   cd inventory-app
   npm install
   ```

2. **Environment variables:**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   DIRECT_URL="postgresql://user:pass@host/db?sslmode=require"
   JWT_SECRET="your-secret-key"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="admin123"
   ```

3. **Database setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Run:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`

## 🏗 Architecture

- **Server Components + API Routes**: Next.js App Router for SSR pages and REST API endpoints under `/api/`.
- **Edge Middleware**: JWT validation via `jose` — routes are protected before page load.
- **Master-Detail Layout**: Enterprise UI pattern with left-side list navigation and right-side detail panels.
- **Automatic Inventory Reconciliation**: Stock levels are updated automatically via Prisma transactions when order statuses advance.
- **Cloud-Native**: PostgreSQL on Neon (serverless) + Vercel for zero-downtime deployment.

## 📁 Project Structure

```
inventory-app/
├── prisma/
│   ├── schema.prisma          # Database schema (7 models)
│   └── seed.ts                # Demo data seeder
├── src/
│   ├── app/
│   │   ├── api/               # REST API routes
│   │   │   ├── auth/          # Login/Logout/Me endpoints
│   │   │   ├── activity/      # Activity feed endpoint
│   │   │   ├── dashboard/     # Dashboard analytics
│   │   │   ├── products/      # Product CRUD
│   │   │   ├── orders/        # Order CRUD + advance status
│   │   │   ├── customers/     # Customer listing
│   │   │   ├── suppliers/     # Supplier listing
│   │   │   └── manufacturing/ # Manufacturing CRUD
│   │   ├── login/             # Login page
│   │   ├── products/          # Products page
│   │   ├── sales/             # Sales orders page
│   │   ├── purchases/         # Purchase orders page
│   │   ├── manufacturing/     # Manufacturing (WIP) page
│   │   ├── history/           # Order history + CSV export
│   │   ├── page.tsx           # Dashboard
│   │   ├── layout.tsx         # Root layout with conditional sidebar
│   │   └── globals.css        # Complete design system
│   ├── components/
│   │   └── Sidebar.tsx        # Navigation + dark mode + shortcuts
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # JWT sign/verify utilities
│   │   └── utils.ts           # Formatting helpers
│   └── middleware.ts          # Route protection
├── next.config.ts
├── package.json
└── README.md
```

## 📄 License
MIT
