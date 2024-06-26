import React from 'react';
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
import Scholarships from './pages/AdminScholarships.js';
import Dashboard from './pages/AdminDashboard';
import Partners from './pages/AdminPartners';
import Events from './pages/AdminEvents';
import Payments from './pages/AdminPayments';
import Branches from './pages/AdminBranches';
import Scholarship from './pages/AdminScholarshipdetail';
import About from './pages/AdminAbout.js';
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
import UserProfilePage from './pages/Profile';

const URL = 'https://loveahfoundation.org/api';
const API_URL = URL; //'http://127.0.0.1:8000';
const Companyname = 'LAHF';
const App = () => {
  
  return (
    <Router>
          <Routes>
            <Route path="/" element={<LandingPage API_URL={API_URL} />} exact ></Route>
            <Route path="/about" element={<AboutPage API_URL={API_URL} />} exact ></Route>
            <Route path="/events" element={<EventsPage API_URL={API_URL} />} exact ></Route>
            <Route path="/contribute" element={<PrivateRoute redirectUrl={"/admin/contribute"}><ContributePage API_URL={API_URL} /></PrivateRoute>} exact ></Route>
            <Route path="/contact" element={<ContactUsPage API_URL={API_URL} />} exact ></Route>
            <Route path="/login" element={<LoginPage API_URL={API_URL}/>} exact ></Route>
            <Route path="/signup" element={<SignUpPage API_URL={API_URL}/>} exact ></Route>
            <Route path="/logout" element={<LogoutPage API_URL={API_URL}/>} exact ></Route>
            <Route path="/email/verify" element={<EmailVerificationPage API_URL={API_URL}/>} exact ></Route>
            <Route path="/email/registration/:uid/:token" element={<Registering API_URL={API_URL}/>} exact ></Route>
            <Route path="/profile/:userid" element={<PrivateRoute redirectUrl={"/profile/:userid"} API_URL={API_URL}><UserProfilePage API_URL={API_URL} /></PrivateRoute>} exact ></Route>
            <Route path="/payment/:variable" element={<PrivateRoute redirectUrl={"/admin/payment/:variable"}><PaymentPage API_URL={API_URL}/></PrivateRoute>} ></Route>
            <Route path="/admin/profiles" element={<PrivateRoute redirectUrl={"/admin/profiles"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Profiles API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/profiles/:id" element={<PrivateRoute redirectUrl={"/admin/profiles/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<User API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<PrivateRoute redirectUrl={"/admin/dashboard"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Dashboard API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/about" element={<PrivateRoute redirectUrl={"/admin/about"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<About API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships" element={<PrivateRoute redirectUrl={"/admin/scholarships"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Scholarships API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Scholarship API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/partners" element={<PrivateRoute redirectUrl={"/admin/partners"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Partners API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/partners/:id" element={<PrivateRoute redirectUrl={"/admin/partners/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Partner API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events" element={<PrivateRoute redirectUrl={"/admin/events"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Events API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events/:id" element={<PrivateRoute redirectUrl={"/admin/events/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Event API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute redirectUrl={"/admin/payments"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Payments API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/payments/:id" element={<PrivateRoute redirectUrl={"/admin/payments/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Payment API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/branches" element={<PrivateRoute redirectUrl={"/admin/branches"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Branches API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/branches/:id" element={<PrivateRoute redirectUrl={"/admin/branches/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Branch API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/profile" element={<PrivateRoute redirectUrl={"/admin/profile"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Profile API_URL={API_URL} />} /></PrivateRoute>} />
            {/* Add other routes as needed */}
            {/* <Redirect from="/" to="/" /> */}
            
            <Route component={NotFound}  ></Route>
            
          </Routes>
          
      </Router>
  );
};

export default App;
