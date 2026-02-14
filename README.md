# ShortURL - URL Shortener Application

A modern, full-stack URL shortener built with the MERN stack. Transform long URLs into short, shareable links with comprehensive analytics, custom short codes, and user management.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/Express-4.x-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue?style=flat-square&logo=tailwindcss)

## 🚀 Live Demo

- **Frontend**: [Deploy on Vercel - Add your URL here]
- **Backend API**: [Deploy on Railway/Render - Add your URL here]
- **GitHub Repository**: [https://github.com/piyal007/url-shortener](https://github.com/piyal007/url-shortener)

---

## 💡 Project Idea

**ShortURL** is a comprehensive URL shortening service designed to solve the problem of sharing long, unwieldy URLs. The application provides:

- **Easy URL Management**: Users can create, edit, and delete shortened URLs from a centralized dashboard
- **Analytics Tracking**: Track click counts and view detailed statistics for each shortened URL
- **Custom Short Codes**: Create memorable, branded short links with custom codes
- **User Authentication**: Secure user accounts with Firebase authentication
- **Organized Dashboard**: Professional sidebar navigation with separate sections for URL management, creation, and analytics

This project addresses real-world needs for marketers, content creators, and anyone who needs to share clean, trackable links across social media, emails, or marketing campaigns.

---

## ✨ Implemented Features

### Core Requirements ✅

#### 1. Authentication System
- User registration with email/password
- Secure login with Firebase Authentication
- Google OAuth integration
- Protected routes (dashboard, analytics, create URL)
- User-specific data isolation
- Logout functionality with confirmation dialogs

#### 2. Full CRUD Operations
- **Create**: Shorten URLs with optional custom codes
- **Read**: View all shortened URLs with statistics
- **Update**: Edit original URLs while keeping short codes
- **Delete**: Remove URLs with SweetAlert confirmation dialogs

#### 3. User Dashboard
- Professional sidebar navigation
- Quick statistics cards (Total URLs, Total Clicks, Average Clicks)
- Comprehensive URL list with action buttons
- Individual URL statistics pages
- Separate analytics page with visual charts

#### 4. Responsive UI Design
- Mobile-first design approach
- Tailwind CSS for consistent styling
- Adapts seamlessly across all device sizes
- Touch-friendly interface elements

### Advanced Features (7/5 Required) ✅

#### 1. Search, Filter & Sort
- **Real-time Search**: Search by short code or original URL
- **Smart Filtering**: Filter by active URLs (with clicks) or inactive URLs (no clicks)
- **Multiple Sort Options**:
  - Newest first
  - Oldest first
  - Most clicks
  - Least clicks
- Instant results with optimized performance

#### 2. Analytics Dashboard
- **Visual Charts**: Interactive bar and pie charts using Recharts
- **Comprehensive Stats**:
  - Total URLs created
  - Total clicks across all URLs
  - Average clicks per URL
  - Active URLs count
- **Top Performer**: Highlights the most clicked URL
- **Click Distribution**: Pie chart showing click distribution across URLs
- **Top 5 URLs**: Bar chart displaying the most popular links

#### 3. Interactive UI
- Smooth page transitions and animations
- Hover effects on all interactive elements
- Loading animations with skeleton screens
- Micro-interactions for better user feedback
- Animated success states
- Slide-in animations for new content

#### 4. Reusable Architecture
- **16+ Modular Components**:
  - UI components (Button, Input, Card, PasswordInput)
  - Feature components (Navbar, Sidebar, Pagination, Filters)
  - Layout components (DashboardLayout, ProtectedRoute, PublicRoute)
- **Custom Hooks**: AuthContext for global authentication state
- **Consistent Component Structure**: Scalable and maintainable codebase
- **Separation of Concerns**: Clear distinction between UI, logic, and data

#### 5. Advanced Forms
- **Real-time Validation**: URL format validation
- **Custom Code Validation**: Pattern matching for allowed characters
- **Password Visibility Toggle**: Enhanced UX for password fields
- **Error Handling**: Clear error messages with toast notifications
- **Loading States**: Visual feedback during form submission
- **Success States**: Beautiful confirmation cards after URL creation

#### 6. Optimized Data Handling
- **Pagination**: 5 URLs per page for better performance
- **Smart Page Navigation**: Previous/Next buttons with page numbers
- **Auto-reset**: Returns to page 1 when filters change
- **Efficient Rendering**: useMemo for filtered/sorted data
- **Lazy Loading**: Components load only when needed

#### 7. Activity & Notification System
- **Toast Notifications**: React Hot Toast for non-intrusive alerts
- **SweetAlert Dialogs**: Professional confirmation dialogs for critical actions
- **Action Feedback**:
  - Success messages for URL creation, updates, deletion
  - Error messages with helpful information
  - Loading indicators during operations
- **Copy to Clipboard**: One-click copy with success notification

### UI/UX Excellence ✅

#### Responsive Layout
- Mobile hamburger menu with slide-out sidebar
- Desktop sticky sidebar navigation
- Flexible grid layouts that adapt to screen size
- No horizontal scrolling or layout breaks

#### Consistent Design System
- Unified color palette (blue primary, slate neutrals)
- Consistent spacing using Tailwind's spacing scale
- Typography hierarchy with clear font sizes
- Rounded corners and shadows for depth
- Consistent button styles and states

#### User Feedback States
- **Loading Skeletons**: Match actual component structure
- **Empty States**: Helpful messages with call-to-action buttons
- **Error States**: Clear error messages with retry options
- **Success States**: Positive reinforcement for completed actions

#### Clear Navigation
- **Sidebar Navigation**: Always visible on desktop
- **Mobile Menu**: Accessible hamburger menu
- **Active States**: Highlighted current page
- **User Profile**: Avatar with user information
- **Quick Actions**: Easy access to logout and create URL

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.x
- **Authentication**: Firebase Authentication (v11)
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Dialogs**: SweetAlert2
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Native Driver
- **Authentication**: Firebase Admin SDK
- **Security**: CORS middleware
- **Environment**: dotenv

### Development Tools
- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **Code Editor**: VS Code
- **API Testing**: Postman/Thunder Client

### Deployment (Recommended)
- **Frontend**: Vercel (optimized for Next.js)
- **Backend**: Railway or Render
- **Database**: MongoDB Atlas (Free tier available)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier)
- Firebase project (free tier)
- Git installed

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/piyal007/url-shortener.git
cd url-shortener
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
BASE_URL=http://localhost:5000
```

Add your Firebase service account JSON file as `url-shortener-piyal.json` in the backend folder.

Start the backend server:
```bash
node index.js
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env.local` file in frontend folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

#### 4. Access the Application
Open your browser and navigate to `http://localhost:3000`

---

## 🎯 Challenges & Solutions

### Challenge 1: Firebase Authentication with Express Backend
**Problem**: Integrating Firebase client-side authentication with Express backend for protected API routes.

**Solution**: 
- Implemented Firebase Admin SDK on the backend
- Created authentication middleware that verifies Firebase ID tokens
- Frontend sends ID token in Authorization header for each protected request
- Backend validates token and extracts user ID for data isolation

**Learning**: Understanding the difference between client-side Firebase Auth and server-side token verification was crucial for secure API design.

---

### Challenge 2: Real-time Search Performance
**Problem**: Search functionality was causing the entire URL list to re-render on every keystroke, leading to performance issues with large datasets.

**Solution**:
- Used React's `useMemo` hook to memoize filtered and sorted results
- Only recompute when dependencies (urls, searchTerm, sortBy, filterBy) change
- Prevented unnecessary re-renders of child components

**Learning**: React performance optimization techniques like memoization are essential for smooth user experiences.

---

### Challenge 3: Pagination State Management
**Problem**: When users applied filters or changed sort order, they remained on the current page, often showing empty results.

**Solution**:
- Added `useEffect` hook to automatically reset to page 1 when filters change
- Calculated total pages dynamically based on filtered results
- Disabled pagination buttons appropriately when on first/last page

**Learning**: User experience requires anticipating edge cases and handling state transitions smoothly.

---

### Challenge 4: Mobile Sidebar Navigation
**Problem**: Dashboard sidebar took up too much space on mobile devices and wasn't accessible.

**Solution**:
- Implemented responsive sidebar with slide-out drawer on mobile
- Added hamburger menu button with smooth animations
- Created overlay backdrop for better mobile UX
- Used Tailwind's responsive utilities (lg: prefix) for breakpoint-specific styling

**Learning**: Mobile-first design requires different interaction patterns than desktop interfaces.

---

### Challenge 5: Form Validation and Error Handling
**Problem**: Users weren't getting clear feedback when URL shortening failed or when they entered invalid data.

**Solution**:
- Implemented comprehensive client-side validation
- Added server-side validation with descriptive error messages
- Used toast notifications for non-blocking feedback
- Created beautiful success states to confirm actions

**Learning**: Good error handling is as important as the happy path for user satisfaction.

---

### Challenge 6: Custom Short Code Conflicts
**Problem**: Multiple users could potentially try to use the same custom short code, causing conflicts.

**Solution**:
- Added unique index on shortCode field in MongoDB
- Implemented server-side validation to check code availability
- Provided clear error messages when codes are taken
- Suggested alternatives or allowed users to try different codes

**Learning**: Database constraints and proper error handling prevent data integrity issues.

---

### Challenge 7: Loading States and Perceived Performance
**Problem**: Users experienced blank screens during data fetching, creating a poor user experience.

**Solution**:
- Created skeleton screens that match the actual component structure
- Implemented loading states for all async operations
- Added smooth transitions between loading and loaded states
- Used optimistic UI updates where appropriate

**Learning**: Perceived performance is often more important than actual performance for user satisfaction.

---

## 🚀 Future Improvements

### Short-term Enhancements
- **QR Code Generation**: Generate QR codes for each shortened URL
- **URL Expiration**: Set expiration dates for temporary links
- **Bulk URL Shortening**: Upload CSV files to shorten multiple URLs at once
- **Export Analytics**: Download analytics data as CSV or PDF
- **Link Preview**: Show preview of destination before redirecting
- **Password Protection**: Add optional password protection for sensitive links

### Long-term Features
- **Team Collaboration**: Share URLs and analytics with team members
- **Custom Domains**: Use your own domain for branded short links
- **Geographic Analytics**: Track clicks by country and region
- **Device Analytics**: See which devices and browsers are used
- **A/B Testing**: Create multiple versions of URLs to test performance
- **API Rate Limiting**: Implement rate limiting for API security
- **Webhook Notifications**: Send notifications when URLs are clicked
- **Link Retargeting**: Add retargeting pixels to shortened URLs
- **UTM Parameter Builder**: Built-in tool for campaign tracking
- **Browser Extension**: Chrome/Firefox extension for quick URL shortening

### Technical Improvements
- **Redis Caching**: Cache frequently accessed URLs for faster redirects
- **CDN Integration**: Serve static assets from CDN
- **Database Optimization**: Add more indexes for faster queries
- **API Documentation**: Interactive API docs with Swagger
- **Unit Testing**: Comprehensive test coverage with Jest
- **E2E Testing**: End-to-end tests with Playwright
- **CI/CD Pipeline**: Automated testing and deployment
- **Monitoring**: Application performance monitoring with Sentry
- **Analytics**: User behavior tracking with Google Analytics

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Clean landing page with URL shortening form and authentication options*

### Dashboard - URL List
![Dashboard](screenshots/dashboard.png)
*Professional dashboard with sidebar navigation, statistics cards, and URL management*

### Dashboard - Create URL
![Create URL](screenshots/create.png)
*Dedicated page for creating shortened URLs with custom code support*

### Analytics Page
![Analytics](screenshots/analytics.png)
*Comprehensive analytics with interactive charts and top performer highlights*

### Individual URL Stats
![URL Stats](screenshots/url-stats.png)
*Detailed statistics for individual shortened URLs*

### Mobile View
![Mobile](screenshots/mobile.png)
*Fully responsive design with hamburger menu and optimized mobile layout*

---

## 📁 Project Structure

```
url-shortener/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.jsx              # Analytics page
│   │   │   │   ├── create/
│   │   │   │   │   └── page.jsx              # Create URL page
│   │   │   │   ├── [shortCode]/
│   │   │   │   │   └── page.jsx              # Individual URL stats
│   │   │   │   └── page.jsx                  # Dashboard home
│   │   │   ├── login/
│   │   │   │   └── page.jsx                  # Login page
│   │   │   ├── signup/
│   │   │   │   └── page.jsx                  # Signup page
│   │   │   ├── layout.jsx                    # Root layout
│   │   │   ├── page.jsx                      # Home page
│   │   │   └── globals.css                   # Global styles
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── PasswordInput.jsx
│   │   │   │   └── Card.jsx
│   │   │   ├── AnalyticsChart.jsx            # Charts component
│   │   │   ├── DashboardLayout.jsx           # Dashboard wrapper
│   │   │   ├── DashboardSidebar.jsx          # Sidebar navigation
│   │   │   ├── EditUrlModal.jsx              # Edit URL modal
│   │   │   ├── LoadingSkeleton.jsx           # Loading states
│   │   │   ├── Navbar.jsx                    # Main navbar
│   │   │   ├── Pagination.jsx                # Pagination component
│   │   │   ├── ProtectedRoute.jsx            # Auth guard
│   │   │   ├── PublicRoute.jsx               # Public route guard
│   │   │   └── UrlFilters.jsx                # Search/filter/sort
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx               # Auth state management
│   │   └── lib/
│   │       └── firebase.js                   # Firebase config
│   ├── public/
│   │   └── favicon.svg
│   ├── .env.local                            # Environment variables
│   ├── package.json
│   └── next.config.mjs
│
├── backend/
│   ├── index.js                              # Express server & API routes
│   ├── url-shortener-piyal.json              # Firebase service account
│   ├── .env                                  # Environment variables
│   └── package.json
│
└── README.md                                 # This file
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@piyal007](https://github.com/piyal007)
- Email: piyalsha007@gmail.com
- LinkedIn: [LinkedIn](https://linkedin.com/in/piyal-islam)

---

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework
- **Firebase** - For authentication and hosting services
- **MongoDB** - For the flexible NoSQL database
- **Tailwind CSS** - For the utility-first CSS framework
- **Recharts** - For beautiful, responsive charts
- **Lucide** - For the clean, consistent icon set
- **Programming Hero** - For the project opportunity and learning experience

---

**Made with ❤️ for the MERN Stack Project Assignment**

*This project demonstrates full-stack development skills including authentication, CRUD operations, data visualization, responsive design, and modern web development best practices.*
