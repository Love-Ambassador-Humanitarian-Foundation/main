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
import LogoutPage from './pages/Logout.js';
import EmailVerificationPage from './pages/EmailVerificationPage.js';
import Registering from './pages/Registering.js';

const URL = 'https://loveahfoundation.org/api';
const API_URL = URL; //'http://127.0.0.1:8000';
const Companyname = 'LAHF';
const App = () => {
  const [isloggedIn, SetLoggedIn] = useState(localStorage.getItem('access_token')?true:false);
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
          <Route path="/contribute" element={<PrivateRoute redirectUrl={"/admin/contribute"}><ContributePage API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
          <Route path="/contact" element={<ContactUsPage API_URL={API_URL} />} exact ></Route>
          <Route path="/login" element={<LoginPage API_URL={API_URL}/>} exact ></Route>
          <Route path="/signup" element={<SignUpPage API_URL={API_URL}/>} exact ></Route>
          <Route path="/logout" element={<LogoutPage API_URL={API_URL}/>} exact ></Route>
          <Route path="/email/verify" element={<EmailVerificationPage API_URL={API_URL}/>} exact ></Route>
          <Route path="/email/registration/:uid/:token" element={<Registering API_URL={API_URL}/>} exact ></Route>
          <Route path="/profile/:userid" element={<PrivateRoute redirectUrl={"/admin/profile/:userid"}><Profile API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
          <Route path="/payment/:variable" element={<PrivateRoute redirectUrl={"/admin/payment/:variable"}><PaymentPage API_URL={API_URL}/></PrivateRoute>} ></Route>
          <Route path="/admin/profiles" element={<PrivateRoute redirectUrl={"/admin/profiles"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Profiles />} /></PrivateRoute>} />
          <Route path="/admin/profiles/:id" element={<PrivateRoute redirectUrl={"/admin/profiles/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<User />} /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute redirectUrl={"/admin/dashboard"}><AdminMain Companyname={Companyname} isloggedIn={isloggedIn} screen={<Dashboard />} /></PrivateRoute>} />
          <Route path="/admin/about" element={<PrivateRoute redirectUrl={"/admin/about"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<AboutPage />} /></PrivateRoute>} />
          <Route path="/admin/achievements" element={<PrivateRoute redirectUrl={"/admin/achievements"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Achievements />} /></PrivateRoute>} />
          <Route path="/admin/achievements/:id" element={<PrivateRoute redirectUrl={"/admin/achievements/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Achievement />} /></PrivateRoute>} />
          <Route path="/admin/partners" element={<PrivateRoute redirectUrl={"/admin/partners"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Partners />} /></PrivateRoute>} />
          <Route path="/admin/partners/:id" element={<PrivateRoute redirectUrl={"/admin/partners/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Partner />} /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute redirectUrl={"/admin/events"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Events />} /></PrivateRoute>} />
          <Route path="/admin/events/:id" element={<PrivateRoute redirectUrl={"/admin/events/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Event />} /></PrivateRoute>} />
          <Route path="/admin/payments" element={<PrivateRoute redirectUrl={"/admin/payments"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Payments />} /></PrivateRoute>} />
          <Route path="/admin/payments/:id" element={<PrivateRoute redirectUrl={"/admin/payments/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Payment />} /></PrivateRoute>} />
          <Route path="/admin/branches" element={<PrivateRoute redirectUrl={"/admin/branches"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Branches />} /></PrivateRoute>} />
          <Route path="/admin/branches/:id" element={<PrivateRoute redirectUrl={"/admin/branches/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Branch />} /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute redirectUrl={"/admin/profile"}><AdminMain API_URL={API_URL} Companyname={Companyname} isloggedIn={isloggedIn} screen={<Profile />} /></PrivateRoute>} />
          {/* Add other routes as needed */}
          {/* <Redirect from="/" to="/" /> */}
          
          <Route component={NotFound}  ></Route>
          
        </Routes>
        
    </Router>
  );
};

export default App;
