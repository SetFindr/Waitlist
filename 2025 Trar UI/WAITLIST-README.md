# SetFindr Waitlist Pages

## Overview

This package contains two new HTML files that create a mobile-oriented landing page for the SetFindr waitlist:

- `waitlist.html` - The main landing page that explains the SetFindr concept and encourages users to join the waitlist
- `waitlist-signup.html` - The form page where users can enter their information to join the waitlist

## Features

- **Modern Design**: Black background with yellow gradient and purple accents
- **Mobile-First**: Optimized for mobile viewing with responsive design
- **Animations**: Smooth animations for elements as they come into view
- **Interactive Elements**: Hover effects and animated CTA buttons
- **Waitlist Counter**: Shows the current number of people on the waitlist
- **Form Validation**: Client-side validation for the signup form
- **Success Message**: Confirmation screen after successful signup

## How to View

To view these pages:

1. Open the HTML files directly in your web browser:
   - Double-click on `waitlist.html` to open the main landing page
   - The "Join Waitlist" button will take you to the signup form page

2. Alternatively, you can set up a local server using one of these methods:
   - Using Python: `python -m http.server 8000`
   - Using Node.js: `npx http-server . --port 8000`
   - Using the included PowerShell script: `./deploy.ps1`

## Design Elements

- **Color Scheme**: Black background with yellow-to-purple gradients
- **Typography**: Clean, modern sans-serif fonts
- **Icons**: Font Awesome icons for visual elements
- **Animations**: Fade-in and slide-up animations for content elements
- **Floating Elements**: Background particle animations

## Integration

These pages are designed to integrate seamlessly with the existing SetFindr website. The header and footer match the main site's design, and the styling extends the existing CSS with additional waitlist-specific styles.