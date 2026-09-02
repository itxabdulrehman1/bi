# Bi-Tech Marketing Solutions

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.19.2-blue.svg)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A modern, responsive web application for **Bi-Tech Marketing Solutions**, featuring custom UI styling, job listings directory, interactive contact form with server-side validation, and dynamic content rendering.

---

## 🚀 Features

- **Dynamic Homepage**: Features real-time company highlights, key service statistics, and featured job opportunities.
- **Careers & Job Listings Directory**: Comprehensive job listings with filtering by job type/department and detailed application view pages.
- **Interactive Contact Form**: Built-in server-side email & required field validation with local JSON fallback submission persistence.
- **Responsive Modular Design**: Clean architecture utilizing EJS partials (navbar, footer, headers), CSS design tokens, glassmorphism UI elements, and modern typography.
- **Custom 404 & Error Handling**: User-friendly fallback views for missing routes and job listings.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Custom Modern Vanilla CSS (Flexbox, Grid, CSS Variables)
- **Config**: dotenv
- **Development**: Nodemon

---

## 📁 Project Structure

```text
bitech/
├── data/                  # Data stores (jobs dataset & contact submissions)
│   ├── .gitkeep
│   └── jobs.json
├── public/                # Static assets served by Express
│   ├── css/               # Application styles
│   └── images/            # Images & brand assets
├── routes/                # Express router modules
│   └── index.js           # Main application routes & form submission handler
├── utils/                 # Helper utilities & data retrieval methods
│   └── jobsData.js
├── views/                 # EJS templates
│   ├── partials/          # Reusable partial views (nav, footer, headers)
│   ├── 404.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   ├── faqs.ejs
│   ├── index.ejs
│   ├── job-detail.ejs
│   ├── job-not-found.ejs
│   ├── jobs.ejs
│   └── services.ejs
├── .env.example           # Sample environment configuration file
├── .gitignore             # Standard git ignore file
├── package.json           # Dependencies and scripts configuration
├── README.md              # Project documentation
└── server.js              # Application entry point
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/bitech-marketing-solutions.git
   cd bitech-marketing-solutions
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

5. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📄 License

This project is licensed under the ISC License.
