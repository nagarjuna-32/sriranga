# RANGA SRI ENTERPRISES – PROFESSIONAL BUSINESS PLATFORM

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/nagarjuna-32/sriranga?color=7048E8)
![GitHub stars](https://img.shields.io/github/stars/nagarjuna-32/sriranga?style=social)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.19-000000?logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37-52B0E7?logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)

> **"ONE-STOP SOLUTION FOR EVERY NEED"**  
> *"EVERY SERVICE. ONE CONNECTION. Connecting You to Opportunities."*  
> *"To provide a single platform where individuals, business owners, companies, contractors and industries can access almost every type of service under one roof across Karnataka and eventually throughout India."*

</div>

A full-scale, enterprise-grade multi-service web platform and partner ecosystem engineered for **RANGA SRI ENTERPRISES**. Built with **React + Vite + Tailwind CSS** on the client, an **Express.js REST API with JWT Authentication** on the server, and **MySQL (Sequelize ORM)** with SQLite automatic development fallback.

Featuring **20 Main Service Categories** and **400 Specialized Services** with comprehensive coverage across all **31 Districts of Karnataka**.

---

## 🏛️ Enterprise Scale: 20 Categories & 400 Services

Ranga Sri Enterprises connects individuals, companies, builders, and industries with verified service providers, contractors, suppliers, and agencies:

1. **Construction & Civil Works** (20 Services): Residential & commercial building, industrial construction, renovation, RCC, pre-engineered buildings, site development.
2. **Architecture & Engineering** (20 Services): Architectural design, structural & MEP engineering, HVAC, fire safety, CAD drafting, building approval drawings.
3. **Interior & Exterior Solutions** (20 Services): Full home & office interiors, modular kitchens, false ceilings, elevation design, waterproofing, facade branding.
4. **Building Materials & Industrial Supply** (20 Services): Cement, TMT steel, sand, aggregates, ready-mix concrete, electrical/plumbing supplies, PPE, bulk procurement.
5. **Labour, Contractors & Manpower** (20 Services): Masonry, carpentry, electrical, plumbing, steel fabrication, site supervisors, skilled project teams.
6. **Machinery & Equipment Rental** (20 Services): JCB, excavator, crane, hydra, tippers, concrete pumps, scaffolding, generators, road rollers.
7. **Property & Real Estate** (20 Services): Residential & commercial sales, plots, rental coordination, site visits, property documentation, tenant verification.
8. **Business Setup & Consultancy** (20 Services): Business plans, project reports, company registration, startup incubation, trademark filing, franchise consulting.
9. **Accounting, Taxation & Finance** (20 Services): GST returns, income tax filing, bookkeeping, auditing, payroll management, project finance, loan documentation.
10. **Legal & Documentation Support** (20 Services): Agreement drafting, affidavit assistance, legal notices, sale deed coordination, compliance review.
11. **IT, Software & Digital Solutions** (20 Services): Custom web applications, mobile apps, e-commerce platforms, cloud hosting, SEO, API integrations.
12. **Marketing, Branding & Advertising** (20 Services): Brand identity, logo design, social media campaigns, Google/Meta ads, signage, corporate gifting.
13. **Events, Catering & Hospitality** (20 Services): Corporate conferences, weddings, birthday galas, stage lighting, catering coordination, artist booking.
14. **Automobile, Transport & Logistics** (20 Services): Goods transport, tempo/truck hire, fleet rentals, logistics coordination, commercial vehicle support.
15. **Agriculture, Farm & Rural Services** (20 Services): Drip irrigation, tractor rental, solar pumps, farm fencing, polyhouse setup, organic inputs coordination.
16. **Industrial Services & Fabrication** (20 Services): Steel shed fabrication, laser cutting, welding, industrial maintenance, electrical panels, warehouse storage.
17. **Education, Training & Skill Development** (20 Services): Professional workshops, corporate training, computer courses, career counseling, certification training.
18. **Health, Safety & Environmental Services** (20 Services): Fire safety audits, first aid kits, environmental impact assessment, pest control, industrial hygiene.
19. **Security, Surveillance & Facility Management** (20 Services): Security personnel, CCTV installation, biometric access, housekeeping AMC, deep cleaning.
20. **Daily Needs, Repairs & Utility Services** (20 Services): Electrician, plumber, AC service, carpentry repairs, water delivery, waste management.

---

## 🎨 Design System & Palette

Engineered with a high-contrast corporate aesthetic:

- **Dominant**: **Soft Off-White & Light Gray** (`#F8F9FA`, `#F1F3F5`, `#FFFFFF`) — Clean, open, and modern canvas that prevents visual fatigue.
- **Secondary**: **Charcoal Typography** (`#121417`, `#1A1D20`, `#343A40`) — Deep high-contrast text and structural elements ensuring accessibility and readability.
- **Accents**:
  - **Vibrant Purple** (`#7048E8` / `#5F3DC4`): Primary action buttons, badges, glowing active indicators.
  - **Vibrant Coral** (`#FA5252`): Attention counters, deadline assurance tags, and secondary action alerts.
  - **Vibrant Yellow** (`#FAB005`): Star reviews, subtle icons, and micro-interaction accents.
- **Typography**: Geometric headings (`Outfit`) paired with legible modern body typeface (`Plus Jakarta Sans`).

---

## ⚡ Technology Stack

### Frontend Client
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS with custom theme extensions
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS micro-interactions
- **State & Context**: `AuthContext` (JWT session), `SettingsContext` (site-wide live branding)
- **HTTP Client**: Axios with Bearer token interceptors

### Backend REST API
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Architecture**: Modular Controller-Service-Model REST API
- **Security**: JWT authentication, Bcrypt password hashing, Helmet, CORS, Express-Rate-Limit
- **Uploads**: Multer with MIME validation and size limits

### Database & ORM
- **Database**: MySQL 5.7+ / 8.0+ / MariaDB
- **ORM**: Sequelize ORM (associations, indexes, validation)
- **Zero-Friction Dev Fallback**: Built-in SQLite automatic development fallback enables immediate execution out of the box even without a local MySQL service running!

---

## 📁 Project Structure

```text
chetu/
├── backend/
│   ├── .env.example               # Template environment configuration
│   ├── package.json
│   ├── uploads/                   # Stored user-uploaded media (.gitkeep)
│   └── src/
│       ├── config/
│       │   └── database.js        # Dual-mode Sequelize connection
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
│       │   ├── auth.js            # JWT Bearer verification
│       │   └── rateLimiter.js     # Rate limiting middleware
│       ├── models/
│       │   ├── Admin.js
│       │   ├── Enquiry.js
│       │   ├── PortfolioProject.js
│       │   ├── Service.js
│       │   ├── Testimonial.js
│       │   ├── WebsiteSetting.js
│       │   └── index.js
│       ├── routes/                # Mounts all /api routes
│       ├── utils/
│       │   └── jwt.js
│       └── server.js              # Express app & database seeder trigger
│
├── frontend/
│   ├── public/
│   │   ├── logo.svg               # Corporate SVG emblem
│   │   ├── robots.txt             # SEO crawl directives
│   │   └── sitemap.xml            # Sitemap index
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/             # AdminLayout, ProtectedRoute
│   │   │   ├── common/            # Navbar, Footer, FloatingWhatsApp, EnquiryModal
│   │   │   ├── home/              # Hero, WhyChooseUs, StatsSection, FeaturedPortfolio, CTA
│   │   │   ├── portfolio/         # PortfolioCard, PortfolioDetailModal
│   │   │   └── services/          # ServiceCard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SettingsContext.jsx
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
│   │   ├── services/              # API clients (adminService, publicService)
│   │   └── utils/
│   │       └── whatsapp.js        # Dynamic WhatsApp URL generator
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/
│   ├── schema.sql                 # Pure MySQL DDL schema definitions
│   └── seeds/
│       ├── run-seeds.js           # CLI database seeder
│       └── seedData.js            # Seed data for services, settings, admin
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/nagarjuna-32/sriranga.git
cd sriranga
```

### 2. Configure Backend
Copy `backend/.env.example` to `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# MySQL Credentials (Optional for local dev, auto-falls back to SQLite)
DB_DIALECT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ranga_sri_enterprises

# Security
JWT_SECRET=ranga_sri_enterprise_super_secure_jwt_secret_key_2026_x984
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Database Setup & Seeding
If you run a local MySQL server:
```bash
mysql -u root -p < database/schema.sql
cd backend && npm run seed
```
*(If MySQL is not installed locally, starting the server will automatically bootstrap a local SQLite database with all 6 services, initial settings, admin user, and sample case studies!)*

### 5. Run Development Servers
Open two terminal windows:

**Terminal 1 (Backend REST API):**
```bash
cd backend
npm start
# API runs on: http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Web app runs on: http://localhost:5173
```

---

## 🔐 Administrative Dashboard

- **Portal URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Login URL**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

### Default Admin Credentials
- **Username / Email**: `admin` or `admin@rangasrienterprises.com`
- **Password**: `Admin@RangaSri2026!`

### Admin Capabilities:
1. **Overview Analytics**: Real-time counter of total enquiries, pending enquiries, active services, portfolio items, and recent inquiry activity.
2. **Service Management**: Add, update, reorder, upload images, or deactivate any of the 6 core business pillars.
3. **Enquiry Management**: Review customer submissions, search/filter, update status (`pending` → `contacted` → `completed`), add internal notes, delete entries, and click **WhatsApp** for instant 1-click messaging.
4. **Portfolio Management**: Add client case studies, categorize by industry, mark as featured, upload screenshots.
5. **Testimonial Moderation**: Review user-submitted reviews with star ratings and approve or reject before public display.
6. **Website Settings**: Update contact phone numbers, WhatsApp numbers, email, physical address, business hours, social links, statistics, and statutory disclaimer in real-time.

---

## 📱 WhatsApp Integration

- A floating WhatsApp button is present on all public pages.
- When a customer submits an enquiry:
  1. The form validates all required fields.
  2. The enquiry is saved to the database.
  3. WhatsApp opens automatically with a pre-formatted message:
     ```text
     *NEW ENQUIRY - RANGA SRI ENTERPRISES*
     ----------------------------------------
     👤 *Name:* Anand Sharma
     📞 *Phone:* +91 98450 12345
     ✉️ *Email:* anand@company.com
     🏷️ *Service:* IT & Digital Solutions
     ----------------------------------------
     📝 *Enquiry Details:*
     We are looking to develop a custom web portal for our enterprise.
     ----------------------------------------
     Sent via official website enquiry portal
     ```
- The recipient phone number is fully configurable in the Admin Settings and `.env`.

---

## ⚖️ Statutory Transparency Notice

All public pages, service detail views, and footers display the explicit independent standing notice:
> *"Disclaimer: Ranga Sri Enterprises is an independent consultancy and service facilitation provider. We do not claim official government affiliation, authority or licensing unless explicitly specified. All government-related and administrative services are provided on a procedural assistance and facilitation basis."*

---

## 🛡️ Production Build

```bash
# Build frontend
cd frontend
npm run build

# Run backend in production
cd ../backend
NODE_ENV=production npm start
```

---

## 📄 License & Copyright

© 2026 **RANGA SRI ENTERPRISES**. All rights reserved.  
Developed by [nagarjuna-32](https://github.com/nagarjuna-32).
