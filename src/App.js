import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the landing page component
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/Events';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Profile from './pages/Profile';
import PaymentPage from './pages/Payment';
import Dashboard from './pages/AdminDashboard';
import Users from './pages/AdminUsers';
import ContributePage from './pages/Contribute';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const URL = 'https://loveahfoundation.org/api';
const API_URL = URL; //'http://127.0.0.1:8000';
const Companyname = 'LAHF';
const App = () => {
  const [isloggedIn, SetLoggedIn] = useState(true);
  //api to fetch token
  //if token is valid, SetLoggedIn
  const handleCancel = () => {
    SetLoggedIn(true);
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
        <Routes>
          <Route path="/" element={<LandingPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/about" element={<AboutPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/events" element={<EventsPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/contribute" element={<ContributePage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/contact" element={<ContactUsPage/>} exact ></Route>
          <Route path="/login" element={<LoginPage/>} exact ></Route>
          <Route path="/signup" element={<SignUpPage/>} exact ></Route>
          <Route path="/profile/:userid" element={<Profile API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
          <Route path="/payment/:variable" element={<PaymentPage/>} ></Route>
          <Route path="/admin/dashboard" element={<Dashboard API_URL={API_URL} isloggedIn={isloggedIn}/>} ></Route>
          <Route path="/admin/users/:id" component={Users} ></Route>
          <Route path="/admin/about" element={<Dashboard API_URL={API_URL} isloggedIn={isloggedIn}/>}  ></Route>
          <Route path="/admin/achievement/:id" component={Users}  ></Route>
          <Route path="/admin/activities/:id" element={<Dashboard API_URL={API_URL} isloggedIn={isloggedIn}/>}  ></Route>
          <Route path="/admin/branches/:id" component={Users}  ></Route>
          <Route path="/admin/payments/:id" component={Users}  ></Route>
          <Route path="/admin/reportlog/:id" element={<Dashboard API_URL={API_URL} isloggedIn={isloggedIn}/>}  ></Route>
          <Route path="/admin/events/:id" component={Users}  ></Route>
          {/* <Redirect from="/" to="/" /> */}
          
          <Route component={NotFound}  ></Route>
          
        </Routes>
        
    </Router>
  );
};

export default App;
