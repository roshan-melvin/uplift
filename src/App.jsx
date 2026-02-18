import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Main Landing Sections
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SDGSection from './components/SDGSection';
import Footer from './components/Footer';

// Business Pages
import BusinessLanding from './pages/business/BusinessLanding';
import InvestorLogin from './pages/business/InvestorLogin';
import ManagementLogin from './pages/business/ManagementLogin';
import InvestmentIdeas from './pages/business/InvestmentIdeas';
import VolunteerManagement from './pages/business/VolunteerManagement';

/**
 * Main Content Component for the Landing Page
 */
const LandingPage = () => {
  const scrollAbout = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-navy-900 min-h-screen">
      <Hero onScrollToAbout={scrollAbout} />
      <SDGSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

/**
 * App Root with Routing
 */
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Business Platform Routes */}
        <Route path="/business" element={<BusinessLanding />} />
        <Route path="/business/investor-login" element={<InvestorLogin />} />
        <Route path="/business/management-login" element={<ManagementLogin />} />

        {/* Private Business Routes */}
        <Route
          path="/business/investment-ideas"
          element={
            <ProtectedRoute role="investor">
              <InvestmentIdeas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/volunteers"
          element={
            <ProtectedRoute role="management">
              <VolunteerManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
