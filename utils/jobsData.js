const fs = require('fs');
const path = require('path');

const jobsFilePath = path.join(__dirname, '../data/jobs.json');

/**
 * Reads and parses the jobs JSON data file cleanly.
 * @returns {Array} Array of job objects
 */
function getAllJobs() {
  try {
    const rawData = fs.readFileSync(jobsFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('[jobsData] Error reading jobs.json:', error.message);
    return [];
  }
}

/**
 * Finds a single job object matching the provided ID.
 * @param {string} id - The job slug/identifier
 * @returns {Object|null} The matching job object or null if not found
 */
function getJobById(id) {
  const jobs = getAllJobs();
  if (!id) return null;
  return jobs.find(job => job.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Returns a subset of jobs for homepage preview.
 * @param {number} limit - Number of jobs to return (default 3)
 * @returns {Array} Array of featured job objects
 */
function getFeaturedJobs(limit = 3) {
  const jobs = getAllJobs();
  return jobs.slice(0, limit);
}

module.exports = {
  getAllJobs,
  getJobById,
  getFeaturedJobs
};
