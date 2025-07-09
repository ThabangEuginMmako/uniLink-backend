# 📘 UniLink – Full System Design & Architecture

UniLink is a web-based platform designed to **bridge the gap between students seeking internship opportunities and businesses offering them**.

This repository contains the full-stack backend for UniLink, developed using **Node.js**, **Express**, and **PostgreSQL**, following a modular and RESTful architecture.

---

## 🌐 Overview

UniLink provides a secure, scalable platform for:

* 🎓 **Students** to browse, apply, and track internships.
* 🏢 **Businesses** to post listings, review applicants, and communicate with candidates.
* 🛠️ **Admins** to moderate activity, generate reports, and manage platform users.

---

## 🔄 User Flows

### 🎓 Student Flow

* Sign Up / Log In
* Profile Setup
* Browse Internships
* Apply for Internship
* View Application Status
* Communicate with Business

### 🏢 Business Flow

* Register / Log In
* Create Company Profile
* Post Internship Listings
* Review Applications
* Shortlist / Accept / Reject Candidates
* Direct Messaging with Students

### 🛠️ Admin Flow

* Admin Login
* User Management (Students & Businesses)
* Approve/Reject Internship Posts
* Monitor Platform Activity
* Generate Analytics Reports
* Handle Support Tickets

---

## 🧹 Key Screens / Pages

| Role     | Screens                                                                                       |
| -------- | --------------------------------------------------------------------------------------------- |
| Student  | Register, Login, Dashboard, Profile Setup, Internship Listings, Application Tracker, Messages |
| Business | Register, Login, Dashboard, Post Internship, Applicant Review, Messaging                      |
| Admin    | Admin Panel, User List, Post Moderation, Reports, Ticketing System                            |

---

## 📄 Database Design

### Entity Relationship Model

| Table                  | Description                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **Students**           | student\_id, name, email, password\_hash, cv\_url, skills, education, created\_at                         |
| **Businesses**         | business\_id, company\_name, email, password\_hash, industry, website, created\_at                        |
| **Admins**             | admin\_id, name, email, password\_hash, role                                                              |
| **InternshipListings** | listing\_id, business\_id → Businesses, title, description, location, start\_date, end\_date, created\_at |
| **Applications**       | application\_id, student\_id → Students, listing\_id → InternshipListings, status, created\_at            |
| **Messages**           | message\_id, sender\_id, receiver\_id, message\_body, timestamp                                           |
| **Feedback**           | feedback\_id, application\_id → Applications, feedback\_text, rating                                      |
| **AuditLogs**          | log\_id, actor\_id, action\_type, target\_table, timestamp                                                |

### Relationships

* A student can apply to many internships.
* A business can post many internships.
* An internship can have many applications.
* An application can receive feedback.
* Messages occur between students and businesses.
* Admins moderate content and log actions.

---

## 🧑‍💻 Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React.js, Tailwind CSS                        |
| Backend  | Node.js, Express.js                           |
| Database | PostgreSQL                                    |
| Auth     | JSON Web Tokens (JWT)                         |
| Hosting  | Render/Vercel (demo), AWS/Google Cloud (prod) |

---

## 🧱 System Architecture

The system follows a **modular, service-oriented architecture**:

* The frontend communicates with the backend via **REST APIs**.
* Each user role is logically separated.
* Centralized PostgreSQL database.
* Auth flows secured with **JWT tokens**.
* **Audit logs** and **role-based access control** (RBAC) are supported.

---

## ⚙️ Setup Instructions

### 🔐 Environment Variables (`.env`)

Create a `.env` file in the root of the project:

```
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=unilink_user
DB_PASSWORD=your_password
DB_NAME=unilink
JWT_SECRET=your_jwt_secret
```

---

### 🐘 PostgreSQL Setup

1. Create the database:

```bash
createdb unilink
```

2. Import schema:

```bash
psql -U unilink_user -d unilink -f schema.sql
```

### 🚀 Run the Project

```bash
npm install
npm run dev
```

This will:

* Start the Express server on [http://localhost:5000](http://localhost:5000)
* Watch for changes using nodemon

---

## 📬 API Overview (Phase 1 Completed)

### Auth Endpoints

#### 👨‍🎓 Student

```http
POST /api/auth/register
POST /api/auth/login
```

#### 🏢 Business

```http
POST /api/business/auth/register
POST /api/business/auth/login
```

---

### Internship Endpoints

```http
GET  /api/internships             # List all internships
GET  /api/internships/:id         # View a single internship
POST /api/internships             # Create internship (business only, with token)
```

Internship creation has:

* JWT business token verification
* Duplicate prevention logic (via DB constraint + app logic)

---

## ✅ Current Progress

| Feature                            | Status |
| ---------------------------------- | ------ |
| Student Register/Login             | ✅      |
| Business Register/Login            | ✅      |
| JWT Authentication & Middleware    | ✅      |
| Internship Posting                 | ✅      |
| Prevent Duplicate Internship Posts | ✅      |
| Get All Internships                | ✅      |
| Get Internship by ID               | ✅      |
| Apply to Internship                | ⏳      |
| Admin Moderation & Reports         | ⏳      |
| Student Dashboard & Messaging      | ⏳      |

---

## 👨‍💼 Author

**Thabang Mmako**

* 🎓 WeThinkCode and Vaal University of Technology\_ Graduate
* 🔧 Shift Maintenance Technician turned Software Developer
* ❤️ Passionate about Engineering, Technology, and empowering student careers

---

## 📄 License

This project is open-source under the MIT License.

---

## 🤝 Contribute

If you'd like to contribute:

1. Fork the repo
2. Create a feature branch
3. Submit a PR

All contributions are welcome — especially on the frontend, admin features, and analytics!
