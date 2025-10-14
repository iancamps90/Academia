// Entry point for Vercel deployment
require('dotenv').config();

// Import the compiled TypeScript app
const app = require('./dist/index.js').default;

// Export for Vercel
module.exports = app;