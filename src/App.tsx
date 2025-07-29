import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarProvider } from './contexts/CarContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { RideShareProvider } from './contexts/RideShareContext';
import { TrafficFinesProvider } from './contexts/TrafficFinesContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Services from './pages/Services';
import Premium from './pages/Premium';
import Maintenance from './pages/Maintenance';
import RentCar from './pages/RentCar';
import RideShare from './pages/RideShare';
import TrafficFines from './pages/TrafficFines';
import PaymentCards from './pages/PaymentCards';

// Demo data initialization
const initializeDemoData = () => {
  const demoUsers = [
    {
      id: 'demo-free',
      email: 'demo@example.com',
      password: 'password123',
      isPremium: false,
      createdAt: new Date('2024-01-01').toISOString()
    },
    {
      id: 'demo-premium',
      email: 'premium@example.com',
      password: 'password123',
      isPremium: true,
      createdAt: new Date('2024-01-01').toISOString()
    }
  ];

  // Only add demo users if none exist
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

function App() {
  // Initialize demo data on app start
  React.useEffect(() => {
    initializeDemoData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PaymentProvider>
          <CarProvider>
            <RideShareProvider>
              <TrafficFinesProvider>
                <div className="min-h-screen flex flex-col bg-gray-50">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/maintenance" element={<Maintenance />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/premium" element={<Premium />} />
                      <Route path="/rent" element={<RentCar />} />
                      <Route path="/rideshare" element={<RideShare />} />
                      <Route path="/fines" element={<TrafficFines />} />
                      <Route path="/cards" element={<PaymentCards />} />
                      <Route path="/settings" element={<Navigate to="/profile" replace />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </TrafficFinesProvider>
            </RideShareProvider>
          </CarProvider>
        </PaymentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;