# NGO Impact Reporting System

A full‑stack web application to help NGOs across India submit monthly impact reports and enable administrators to track, aggregate, and analyze impact data at scale.

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis
* BullMQ (background job processing)
* Multer (file uploads)

---

## Features

* Submit single monthly NGO reports
* Upload bulk reports via CSV (asynchronous processing)
* Background job status tracking
* Partial failure handling (invalid rows do not stop processing)
* Idempotent report storage (NGO + Month unique)
* Admin dashboard with monthly aggregates

---

## Setup Instructions

### Prerequisites

* Node.js v18+
* MongoDB (local or Atlas)
* Redis

---

### 1. Clone Repository

```bash
git clone https://github.com/Shafeeque27/ngo-impact-reporting.git
cd ngo-impact-reporting
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ngo_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

Start Redis:

```bash
sudo service redis-server start
```

Run backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

## UI Pages

* **Submit Report Page** – NGO users submit monthly reports
* **Bulk Upload Page** – Upload CSV and track job progress
* **Admin Dashboard** – View aggregated metrics by month

Demo Recording:

* *https://drive.google.com/file/d/1L0y5tKoDpGFMQ4YgR8bd8qVMyAgiRhUI/view?usp=sharing*

---

## Author

**Muhammed Shafeeque K**
MERN Stack & Golang Developer

---


