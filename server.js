// Load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes Registration
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Catch-All 404 Middleware for Unmatched Routes
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found | Bi-Tech Marketing Solutions',
    currentPath: req.path
  });
});

// Server port configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Bi-Tech Server] Server is running on http://localhost:${PORT}`);
});
