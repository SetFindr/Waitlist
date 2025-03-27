# SetFindr Website Export Guide

## Package Contents

This ZIP package contains all the necessary files for the SetFindr website project. The package includes:

- HTML files (index.html, locations.html, gear.html)
- CSS styling (styles.css)
- JavaScript functionality (script.js, animations.js)
- Deployment scripts (deploy.ps1)
- Documentation (README.md, deployment-guide.md)

## For Development Team

### Getting Started

1. Extract the ZIP file to your local development environment
2. The website can be run locally using any of these methods:
   - Using the included PowerShell script: `./deploy.ps1`
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx http-server . --port 8000`

### Project Structure

- `index.html` - Main homepage
- `locations.html` - Film locations listing page
- `gear.html` - Film equipment listing page
- `styles.css` - All styling for the website
- `script.js` - Core JavaScript functionality
- `animations.js` - Animation effects and UI enhancements
- `deploy.ps1` - PowerShell deployment script for local testing
- `README.md` & `deployment-guide.md` - Documentation

### Development Notes

- The website uses vanilla HTML, CSS, and JavaScript (no frameworks)
- Font Awesome is used for icons via CDN
- The site is fully responsive for mobile and desktop viewing
- All image assets are loaded from external URLs (Unsplash)

### Deployment Options

Refer to the `deployment-guide.md` file for detailed instructions on:
- Local deployment
- Using tunneling services (ngrok, localtunnel)
- Deploying to hosting services (GitHub Pages, Netlify, Vercel, Firebase)
- Advanced VPS deployment

## Next Steps

After reviewing the code, please provide feedback on:
1. Any browser compatibility issues
2. Performance optimizations
3. Additional features to implement
4. Suggestions for improving the UI/UX

Contact the project manager with any questions about the implementation requirements.