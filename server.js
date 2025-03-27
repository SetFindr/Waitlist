// SetFindr Waitlist CRM Backend
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Database file path
const DB_FILE = path.join(__dirname, 'waitlist-data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    waitlist: [],
    stats: {
      totalSignups: 0,
      signupsByCity: {},
      signupsByRole: {},
      signupsByInterest: {}
    }
  }));
}

// Read database
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { waitlist: [], stats: { totalSignups: 0, signupsByCity: {}, signupsByRole: {}, signupsByInterest: {} } };
  }
}

// Write to database
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}

// Update statistics
function updateStats(db, entry) {
  // Increment total signups
  db.stats.totalSignups++;
  
  // Update city stats
  const city = entry.city;
  db.stats.signupsByCity[city] = (db.stats.signupsByCity[city] || 0) + 1;
  
  // Update role stats
  const role = entry.role;
  db.stats.signupsByRole[role] = (db.stats.signupsByRole[role] || 0) + 1;
  
  // Update interest stats
  if (Array.isArray(entry.interests)) {
    entry.interests.forEach(interest => {
      db.stats.signupsByInterest[interest] = (db.stats.signupsByInterest[interest] || 0) + 1;
    });
  }
  
  return db;
}

// API Routes

// Submit waitlist entry
app.post('/api/waitlist', (req, res) => {
  try {
    const db = readDatabase();
    
    // Create entry with timestamp and session data
    const entry = {
      ...req.body,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      sessionData: {
        userAgent: req.headers['user-agent'],
        referrer: req.headers.referer || 'direct',
        ipAddress: req.ip
      }
    };
    
    // Add to waitlist
    db.waitlist.push(entry);
    
    // Update statistics
    updateStats(db, entry);
    
    // Save to database
    if (writeDatabase(db)) {
      res.status(201).json({
        success: true,
        message: 'Successfully added to waitlist',
        position: db.waitlist.length
      });
    } else {
      throw new Error('Failed to write to database');
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to waitlist',
      error: error.message
    });
  }
});

// Get waitlist count
app.get('/api/waitlist/count', (req, res) => {
  try {
    const db = readDatabase();
    res.json({
      count: db.waitlist.length
    });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get waitlist count',
      error: error.message
    });
  }
});

// Admin route to get statistics
app.get('/api/admin/stats', (req, res) => {
  try {
    const db = readDatabase();
    res.json(db.stats);
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error.message
    });
  }
});

// Admin route to get waitlist entries
app.get('/api/admin/waitlist', (req, res) => {
  try {
    const db = readDatabase();
    res.json(db.waitlist);
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get waitlist entries',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the CRM dashboard at http://localhost:${PORT}/admin.html`);
});