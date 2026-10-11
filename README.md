# 🚲 Haji Cycle Store (हाजी साइकिल स्टोर)

> **मजबूत सवारी • शानदार अंदाज़ • हर सफर में साथ**  
> **पता / Address**: कोल्हुई बाजार, सोनौली रोड, महराजगंज, उत्तर प्रदेश  
> **GitHub Repository**: [https://github.com/moeed111/hajicyclestore](https://github.com/moeed111/hajicyclestore)

---

## 📌 Overview

A modern, responsive full-stack web application designed for **Haji Cycle Store**, showcasing complete retail inventory with category navigation, real-time stock management, and an admin portal protected with credential-based authentication.

### Key Features
- **Branded Storefront**: Custom handcrafted UI featuring the authentic store badge logo and theme.
- **Intro Opening Animation**: Brand emblem reveal with tagline and direct store explore button.
- **Category & Sub-section Navigation**:
  - **Cycles**: Sub-categories for *Ranger cycle (MTB/Sports)*, *Standard cycle (Roadster)*, *Kids cycle*, and *Ladies cycle*.
  - **Cycle Tubes**
  - **Cycle Parts & Accessories**
  - **Tubes for Bikes & Other Vehicles**
  - **Tyres for Bikes & Other Vehicles** (Bikes, Scooters, E-Rickshaws, Tractors)
- **Direct WhatsApp Orders**: 1-click WhatsApp inquiry with auto-filled product name and price details.
- **Admin Inventory Dashboard**:
  - Secure credential-based login for 2 authorized administrators.
  - Add products with multiple category tagging, specifications, and image upload.
  - Instant stock status toggle (In Stock / Out of Stock) and quantity stepper.
  - Delete and edit inventory items in real time.

---

## 🔐 Admin Authentication

The admin panel is protected and inaccessible to random visitors. Only authorized store management can sign in:

| Administrator | Username | Default Password | Role |
| :--- | :--- | :--- | :--- |
| **Admin 1 (Store Owner)** | `admin1` | `haji@123` | OWNER_ADMIN |
| **Admin 2 (Store Manager)** | `admin2` | `cycle@123` | STORE_MANAGER |

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Vanilla CSS Custom Design System, Lucide Icons
- **Backend**: Spring Boot 3, Java 17, Spring Data JPA, Hibernate, Maven
- **Database**: MySQL 8.0 (Local / Aiven Cloud MySQL)
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/) (Docker)
  - Database: [Aiven](https://aiven.io/)

---

## ⚙️ Cloud Deployment Configuration

### 1. Render Environment Variables (Backend)

| Environment Variable | Description / Value |
| :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://<AIVEN_HOST>:<PORT>/defaultdb?sslMode=REQUIRED&allowPublicKeyRetrieval=true` |
| `SPRING_DATASOURCE_USERNAME` | `<AIVEN_USERNAME>` |
| `SPRING_DATASOURCE_PASSWORD` | `<AIVEN_PASSWORD>` |
| `PORT` | `8080` |

### 2. Vercel Environment Variables (Frontend)

| Environment Variable | Value |
| :--- | :--- |
| `VITE_API_BASE_URL` | `https://<YOUR_RENDER_BACKEND_URL>/api` |

---

## 🚀 Local Development Setup

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

© Haji Cycle Store, Kolhui Bazar, Maharajganj, Uttar Pradesh.
