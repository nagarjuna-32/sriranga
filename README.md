# RANGA SRI ENTERPRISES – PROFESSIONAL BUSINESS PLATFORM

> **"Your Trusted Partner for Business & Digital Solutions"**  
> *"Making Business Simpler. Making Ideas Happen."*

A modern, responsive, corporate multi-service enterprise web application engineered for **RANGA SRI ENTERPRISES**. Built with **React (Vite) + Tailwind CSS + Lucide Icons** on the frontend, a robust **Node.js / Express.js REST API** on the backend, and **MySQL (Sequelize ORM)** for relational data persistence.

---

## 🏛️ Enterprise Service Pillars

Ranga Sri Enterprises provides integrated professional services across six core pillars:

1. **Government & Documentation**: Documentation assistance, application support, procedural guidance, document preparation, and administrative coordination. *(Provided under independent facilitation notice).*
2. **Business & Registration**: Company setup guidance, MSME/partnership documentation, entity structuring, registration support, and business consulting.
3. **IT & Digital Solutions**: Modern responsive web development, enterprise UI/UX design, bespoke software systems, digital transformation, cloud adoption, and IT support.
4. **Property & Real Estate**: Property documentation coordination, listing visibility, prospect enquiry coordination, and asset support.
5. **Marketing & Advertising**: Full-funnel digital marketing, social media management, brand visual identity, multi-channel ad campaigns, and creative collateral.
6. **Event Management**: Turnkey corporate conferences, grand birthday celebrations, weddings, stage design, AV coordination, and on-ground hospitality.

---

## ⚡ Technology Stack

### Frontend
- **Framework**: React 18 / 19 with Vite
- **Styling**: Tailwind CSS (custom corporate navy, royal blue, and subtle gold palette)
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Animations & Interactivity**: Framer Motion & CSS micro-interactions
- **HTTP Client**: Axios with automatic JWT interceptors

### Backend
- **Runtime**: Node.js (v24+)
- **Web Framework**: Express.js
- **Architecture**: Modular Controller-Service-Model REST API
- **Security**: Helmet, CORS, Express-Rate-Limit, Bcrypt.js, JsonWebToken (JWT)
- **File Uploads**: Multer with strict image MIME-type & 5MB file-size filters

### Database & ORM
- **Database**: MySQL 5.7+ / 8.0+ / MariaDB
- **ORM**: Sequelize ORM (model associations, indexes, auto-sync, seeders)
- **Zero-Friction Dev Fallback**: Automatic SQLite fallback if local MySQL daemon is not running on localhost:3306, enabling zero-config out-of-the-box local developer testing!

---

## 🎨 Design System & Palette

- **Dominant**: **Deep Charcoal & Rich Plum** (`#0C0A10`, `#14111A`, `#1F1A2A`, `#2F2840`, `#64245C`, `#7D2C73`) — Provides prestigious corporate gravitas and high visual contrast.
- **Secondary**: **Crisp White & Champagne** (`#FFFFFF`, `#FCFAF7`, `#F7F2EA`, `#EFE5D4`) — Offers clean warmth, breathing space, and premium card elevations.
- **Accent**: **Muted Gold & Rose** (`#C59B48`, `#D7AB50`, `#E4C379`, `#C47D7D`, `#D18F8F`) — Adds refined sophistication, subtle warmth, and distinct interactive focal points.
- **Typography**: Geometric corporate headings with `Outfit` paired with modern `Plus Jakarta Sans` for body legibility.

---

## 📁 Project Structure

```
├── backend/
│   ├── .env                       # Local environment variables
│   ├── .env.example               # Template environment configuration
│   ├── package.json
│   ├── uploads/                   # Stored uploaded images & logos
│   └── src/
│       ├── config/
│       │   └── database.js        # Sequelize connection & resilient fallback
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── dashboardController.js
│       │   ├── enquiryController.js
│       │   ├── portfolioController.js
│       │   ├── serviceController.js
│       │   ├── settingsController.js
│       │   ├── testimonialController.js
│       │   └── uploadController.js
│       ├── middleware/
│       │   ├── auth.js            # JWT Bearer token authentication
│       │   └── rateLimiter.js     # Brute-force & enquiry rate limiting
│       ├── models/
│       │   ├── Admin.js
│       │   ├── Enquiry.js
│       │   ├── PortfolioProject.js
│       │   ├── Service.js
│       │   ├── Testimonial.js
│       │   ├── WebsiteSetting.js
│       │   └── index.js
│       ├── routes/                # Centralized /api routes
│       ├── utils/
│       │   └── jwt.js
│       └── server.js              # Express app initialization & seeder
│
├── frontend/
│   ├── public/
│   │   ├── logo.svg               # Corporate SVG emblem
│   │   ├── robots.txt             # SEO Crawl directives
│   │   └── sitemap.xml            # Search engine sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/             # AdminLayout, ProtectedRoute
│   │   │   ├── common/            # Navbar, Footer, FloatingWhatsApp, EnquiryModal
│   │   │   ├── home/              # Hero, WhyChooseUs, StatsSection, FeaturedPortfolio, CTA
│   │   │   ├── portfolio/         # PortfolioCard, PortfolioDetailModal
│   │   │   └── services/          # ServiceCard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Admin auth state & token management
│   │   │   └── SettingsContext.jsx# Live site-wide dynamic branding
│   │   ├── pages/
│   │   │   ├── admin/             # Dashboard, Services, Enquiries, Portfolio, Testimonials, Settings
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── services/              # API caller services (Axios)
│   │   └── utils/
│   │       └── whatsapp.js        # Formatted WhatsApp message generator
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/
│   ├── schema.sql                 # Pure MySQL table definitions DDL
│   └── seeds/
│       ├── run-seeds.js           # CLI database seeder
│       └── seedData.js            # 6 core services, case studies & settings
│
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24 recommended)
- **MySQL Server** (Optional for local dev due to auto-fallback; required for production)

### 2. Configure Backend Environment
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=5000
NODE_ENV=development

# MySQL Credentials
DB_DIALECT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ranga_sri_enterprises

# Security
JWT_SECRET=ranga_sri_enterprise_super_secure_jwt_secret_key_2026_x984
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
# In backend/
cd backend
npm install

# In frontend/
cd ../frontend
npm install
```

### 4. Database Setup & Seeding
If you have MySQL running:
```bash
mysql -u root -p < database/schema.sql
cd backend && npm run seed
```
*Note: If MySQL is not running on localhost, the backend automatically utilizes SQLite fallback and auto-bootstraps all 6 services, initial settings, admin user, and sample case studies on first launch!*

### 5. Run the Application
In terminal 1 (Backend API):
```bash
cd backend
npm start
# Server runs on: http://localhost:5000
```

In terminal 2 (Frontend Dev Server):
```bash
cd frontend
npm run dev
# Frontend runs on: http://localhost:5173
```

---

## 🔐 Admin Dashboard

Access the secure administrative portal at:
**URL**: `http://localhost:5173/admin`  
(Redirects to `http://localhost:5173/admin/login` if not authenticated)

### Default Admin Credentials:
- **Username / Email**: `admin` or `admin@rangasrienterprises.com`
- **Password**: `Admin@RangaSri2026!`

### Admin Capabilities:
1. **Dashboard Overview**: Real-time counter of total enquiries, pending enquiries, active services, portfolio count, and recent inquiry activity.
2. **Service Management**: Add, update, reorder, upload images, or deactivate any of the 6 core business pillars.
3. **Enquiry Management**: Review customer submissions, search/filter, update status (`pending` → `contacted` → `completed`), add administrative notes, delete entries, and click **WhatsApp** for instant 1-click messaging!
4. **Portfolio Management**: Add client case studies, categorize by industry, mark as featured, upload screenshots.
5. **Testimonial Moderation**: Review user-submitted reviews with star ratings and approve or reject before public display.
6. **Website Settings**: Change phone numbers, WhatsApp numbers, email, physical address, business hours, social profile links, real business statistics, and statutory disclaimer in real-time without touching code.

---

## 📱 WhatsApp Integration

- A floating WhatsApp button is present on all public pages.
- When a customer fills out any consultation form:
  1. The form validates all required fields.
  2. The enquiry is immediately saved to the database.
  3. WhatsApp opens automatically in a new window with a pre-formatted message:
     ```text
     *NEW ENQUIRY - RANGA SRI ENTERPRISES*
     ----------------------------------------
     👤 *Name:* [Customer Name]
     📞 *Phone:* [Customer Phone]
     ✉️ *Email:* [Customer Email]
     🏷️ *Service:* [Selected Service Pillar]
     ----------------------------------------
     📝 *Enquiry Details:*
     [Customer Message]
     ----------------------------------------
     Sent via official website enquiry portal
     ```
- The target WhatsApp recipient number is 100% configurable in the Admin Settings and `.env`.

---

## ⚖️ Statutory Notice & Independent Standing

All public pages, service detail views, and footers contain the required non-government affiliation notice:
> *"Disclaimer: Ranga Sri Enterprises is an independent consultancy and service facilitation provider. We do not claim official government affiliation, authority or licensing unless explicitly specified. All government-related and administrative services are provided on a procedural assistance and facilitation basis."*

---

## 🛡️ Production Deployment

1. **Frontend Production Build**:
   ```bash
   cd frontend
   npm run build
   ```
   Outputs optimized, gzip-ready static assets into `frontend/dist/`.

2. **Backend Production Run**:
   ```bash
   cd backend
   NODE_ENV=production npm start
   ```
   Can be hosted behind an Nginx reverse proxy or containerized with PM2/Docker.

---

© 2026 **RANGA SRI ENTERPRISES**. All rights reserved.
