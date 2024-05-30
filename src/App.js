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
import ContributePage from './pages/Contribute';
import NotFound from './pages/NotFound';
import AdminMain from './pages/AdminMain';
import Achievements from './pages/AdminAchievements';
import Dashboard from './pages/AdminDashboard';
import Partners from './pages/AdminPartners';
import Events from './pages/AdminEvents';
import Payments from './pages/AdminPayments';
import Branches from './pages/AdminBranches';
import Achievement from './pages/AdminAchievementdetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profiles from './pages/AdminUsers';
import User from './pages/AdminUserDetail';
import Partner from './pages/AdminPartnerDetail';
import Payment from './pages/AdminPaymentDetail';
import Branch from './pages/AdminBranchDetail';
import Event from './pages/AdminEventDetail';
import PrivateRoute from './utils/PrivateRoute.js';

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
          <Route path="/contribute" element={<PrivateRoute><ContributePage API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
          <Route path="/contact" element={<ContactUsPage/>} exact ></Route>
          <Route path="/login" element={<LoginPage/>} exact ></Route>
          <Route path="/signup" element={<SignUpPage/>} exact ></Route>
          <Route path="/profile/:userid" element={<PrivateRoute><Profile API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
          <Route path="/payment/:variable" element={<PrivateRoute><PaymentPage/></PrivateRoute>} ></Route>
          <Route path="/admin/profiles" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Profiles />} /></PrivateRoute>} />
          <Route path="/admin/profiles/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<User />} /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Dashboard />} /></PrivateRoute>} />
          <Route path="/admin/about" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<AboutPage />} /></PrivateRoute>} />
          <Route path="/admin/achievements" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Achievements />} /></PrivateRoute>} />
          <Route path="/admin/achievements/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Achievement />} /></PrivateRoute>} />
          <Route path="/admin/partners" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Partners />} /></PrivateRoute>} />
          <Route path="/admin/partners/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Partner />} /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Events />} /></PrivateRoute>} />
          <Route path="/admin/events/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Event />} /></PrivateRoute>} />
          <Route path="/admin/payments" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Payments />} /></PrivateRoute>} />
          <Route path="/admin/payments/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Payment />} /></PrivateRoute>} />
          <Route path="/admin/branches" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Branches />} /></PrivateRoute>} />
          <Route path="/admin/branches/:id" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Branch />} /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Profile />} /></PrivateRoute>} />
          {/* Add other routes as needed */}
          {/* <Redirect from="/" to="/" /> */}
          
          <Route component={NotFound}  ></Route>
          
        </Routes>
        
    </Router>
  );
};

export default App;
