import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import HeaderComponent from './components/Header'; // Import the header component
import LandingPage from './pages/LandingPage'; // Import the landing page component
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/Events';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PaymentPage from './pages/Payment';
import Footer from './components/Footer'; // Import the footer component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Companyname = 'LAHF';
const App = () => {
  const [isloggedIn, SetLoggedIn] = useState(true);
  //api to fetch token
  //if token is valid, SetLoggedIn
  const handleCancel = () => {
    SetLoggedIn(false);
};
  useEffect(() => {
    handleCancel();

    window.addEventListener('resize', handleCancel);
    window.addEventListener('load', handleCancel);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleCancel);
      window.removeEventListener('load', handleCancel);
    };
  }, []);
  return (
    <Router>
        <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} /> {/* Include the header component */}
        <Routes>
          <Route path="/" element={<LandingPage Companyname={Companyname} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/about" element={<AboutPage Companyname={Companyname} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/events" element={<EventsPage Companyname={Companyname} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/contact" element={<ContactUsPage/>} exact ></Route>
          <Route path="/login" element={<LoginPage/>} exact ></Route>
          <Route path="/signup" element={<SignUpPage/>} exact ></Route>
          <Route path="/payment/:variable" element={<PaymentPage/>} ></Route>
        </Routes>
        <Footer Companyname={Companyname} /> {/* Include the footer component */}
    </Router>
  );
};

export default App;
