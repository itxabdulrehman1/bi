const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jobsData = require('../utils/jobsData');

const submissionsFilePath = path.join(__dirname, '../data/submissions.json');

// GET / - Home Page
router.get('/', (req, res) => {
  const featuredJobs = jobsData.getFeaturedJobs(3);
  res.render('index', {
    title: 'Bi-Tech Marketing Solutions',
    status: 'Operational',
    message: 'Server is running smoothly!',
    currentPath: '/',
    featuredJobs
  });
});

// GET /about - About Us Page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us | Bi-Tech Marketing Solutions',
    currentPath: '/about'
  });
});

// GET /services - Services Page
router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Services | Bi-Tech Marketing Solutions',
    currentPath: '/services'
  });
});

// GET /jobs - Jobs & Internships Directory Page
router.get('/jobs', (req, res) => {
  const jobs = jobsData.getAllJobs();
  res.render('jobs', {
    title: 'Jobs & Internships | Bi-Tech Marketing Solutions',
    currentPath: '/jobs',
    jobs
  });
});

// GET /jobs/:id - Job Listing Detail Page
router.get('/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  const job = jobsData.getJobById(jobId);

  if (!job) {
    res.status(404);
    return res.render('job-not-found', {
      title: 'Listing Not Found | Bi-Tech Marketing Solutions',
      currentPath: '/jobs',
      jobId
    });
  }

  res.render('job-detail', {
    title: `${job.title} | Bi-Tech Careers`,
    currentPath: '/jobs',
    job
  });
});

// GET /faqs - FAQs Page
router.get('/faqs', (req, res) => {
  res.render('faqs', {
    title: 'Frequently Asked Questions | Bi-Tech Marketing Solutions',
    currentPath: '/faqs'
  });
});

// GET /contact - Contact Us Page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | Bi-Tech Marketing Solutions',
    currentPath: '/contact',
    successMessage: null,
    errorMessage: null,
    formData: {}
  });
});

// POST /contact - Submit Contact Form
router.post('/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const trimmedName = name ? name.trim() : '';
  const trimmedEmail = email ? email.trim() : '';
  const trimmedMessage = message ? message.trim() : '';

  // Email validation regex ensuring @ and . pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Server-side validation check
  if (!trimmedName || !trimmedEmail || !trimmedMessage || !emailRegex.test(trimmedEmail)) {
    return res.render('contact', {
      title: 'Contact Us | Bi-Tech Marketing Solutions',
      currentPath: '/contact',
      successMessage: null,
      errorMessage: 'Please fill in all required fields (Name, Email, Message) with a valid email address.',
      formData: { name, email, phone, subject, message }
    });
  }

  // Construct submission payload
  const newSubmission = {
    id: 'sub_' + Date.now(),
    name: trimmedName,
    email: trimmedEmail,
    phone: phone ? phone.trim() : '',
    subject: subject ? subject.trim() : '',
    message: trimmedMessage,
    submittedAt: new Date().toISOString()
  };

  try {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing submissions or initialize empty array
    let submissions = [];
    if (fs.existsSync(submissionsFilePath)) {
      const rawData = fs.readFileSync(submissionsFilePath, 'utf8');
      if (rawData.trim()) {
        submissions = JSON.parse(rawData);
      }
    }

    // Append new submission and save
    submissions.push(newSubmission);
    fs.writeFileSync(submissionsFilePath, JSON.stringify(submissions, null, 2), 'utf8');

    /* 
     * PRODUCTION NOTE: In production, Nodemailer (e.g. nodemailer.createTransport(...))
     * would be invoked here to dispatch real emails directly to info@bitechmarketingsolution.online 
     * and auto-reply confirmation to ${newSubmission.email}.
     */

    const successMsg = `Thank you, ${newSubmission.name}! Your message has been received. Our team will contact you at ${newSubmission.email} within 1-2 business days.`;

    return res.render('contact', {
      title: 'Contact Us | Bi-Tech Marketing Solutions',
      currentPath: '/contact',
      successMessage: successMsg,
      errorMessage: null,
      formData: {}
    });

  } catch (error) {
    console.error('[Contact POST] Error saving submission:', error);
    return res.render('contact', {
      title: 'Contact Us | Bi-Tech Marketing Solutions',
      currentPath: '/contact',
      successMessage: null,
      errorMessage: 'An internal server error occurred while processing your request. Please try again.',
      formData: { name, email, phone, subject, message }
    });
  }
});

module.exports = router;
