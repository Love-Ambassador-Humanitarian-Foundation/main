import React,{useEffect, useState} from 'react';
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
import Dashboard from './pages/AdminDashboard';
import Partners from './pages/AdminPartners';
import Events from './pages/AdminEvents';
import Payments from './pages/AdminPayments';
import Branches from './pages/AdminBranches';
import Scholarships from './pages/AdminScholarships';
import AddScholarship from './pages/AdminAddScholarship'
import Scholarship from './pages/AdminScholarshipdetail';
import ScholarshipApplicants from './pages/AdminScholarshipApplicants.js';
import ScholarshipApplicant from './pages/AdminScholarshipApplicantDetails.js';
import About from './pages/AdminAbout.js';
import Users from './pages/AdminUsers';
import User from './pages/AdminUserDetail';
import AddUser from './pages/AdminAddUser.js';
import Partner from './pages/AdminPartnerDetail';
import Payment from './pages/AdminPaymentDetail';
import Branch from './pages/AdminBranchDetail';
import Event from './pages/AdminEventDetail';
import Emails from './pages/AdminEmails';
import Notifications from './pages/AdminNotifications';
import PrivateRoute from './utils/PrivateRoute.js';
import LogoutPage from './pages/Logout.js';
import EmailVerificationPage from './pages/EmailVerificationPage.js';
import Registering from './pages/Registering.js';
import UserProfilePage from './pages/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddScholarshipApplicant from './pages/AdminAddScholarshipApplicant.js';
import AddPartner from './pages/AdminAddPartners.js';


const Companyname = 'LAHF';
const App = ({API_URL}) => {
  const [isloggedIn, SetLoggedIn] = useState(true);
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
            <Route path="/" element={<LandingPage API_URL={API_URL} isloggedIn={isloggedIn} />} exact ></Route>
            <Route path="/about" element={<AboutPage API_URL={API_URL} isloggedIn={isloggedIn} />} exact ></Route>
            <Route path="/events" element={<EventsPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/contribute" element={<PrivateRoute redirectUrl={"/admin/contribute"}><ContributePage API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
            <Route path="/contact" element={<ContactUsPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/login" element={<LoginPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/signup" element={<SignUpPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/logout" element={<LogoutPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/email/verify" element={<EmailVerificationPage API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/email/registration/:uid/:token" element={<Registering API_URL={API_URL} isloggedIn={isloggedIn}/>} exact ></Route>
            <Route path="/profile/:userid" element={<PrivateRoute redirectUrl={"/profile/:userid"} API_URL={API_URL} ><UserProfilePage API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} exact ></Route>
            <Route path="/payment/:variable" element={<PrivateRoute redirectUrl={"/admin/payment/:variable"}><PaymentPage API_URL={API_URL} isloggedIn={isloggedIn}/></PrivateRoute>} ></Route>
            <Route path="/admin/users" element={<PrivateRoute redirectUrl={"/admin/users"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Users API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/users/add" element={<PrivateRoute redirectUrl={"/admin/users/add"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddUser API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/users/:id" element={<PrivateRoute redirectUrl={"/admin/users/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<User API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<PrivateRoute redirectUrl={"/admin/dashboard"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Dashboard API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/about" element={<PrivateRoute redirectUrl={"/admin/about"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<About API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships" element={<PrivateRoute redirectUrl={"/admin/scholarships"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Scholarships API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships/add" element={<PrivateRoute redirectUrl={"/admin/scholarships/add"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddScholarship API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Scholarship API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<ScholarshipApplicants API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants/add" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants/add"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddScholarshipApplicant API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants/:applicantid" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants/:applicantid"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<ScholarshipApplicant API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/partners" element={<PrivateRoute redirectUrl={"/admin/partners"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Partners API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/partners/add" element={<PrivateRoute redirectUrl={"/admin/partners/add"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddPartner API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/partners/:id" element={<PrivateRoute redirectUrl={"/admin/partners/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Partner API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/events" element={<PrivateRoute redirectUrl={"/admin/events"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Events API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/events/:id" element={<PrivateRoute redirectUrl={"/admin/events/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Event API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute redirectUrl={"/admin/payments"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Payments API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/payments/:id" element={<PrivateRoute redirectUrl={"/admin/payments/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Payment API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/branches" element={<PrivateRoute redirectUrl={"/admin/branches"}><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Branches API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/branches/:id" element={<PrivateRoute redirectUrl={"/admin/branches/:id"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Branch API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />
            <Route path="/admin/profile" element={<PrivateRoute redirectUrl={"/admin/profile"}><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Profile API_URL={API_URL} isloggedIn={isloggedIn}/>} /></PrivateRoute>} />


            <Route 
                path="/admin/emails" 
                element={
                    <PrivateRoute redirectUrl={"/admin/emails"}>
                        <AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Emails API_URL={API_URL} />} />
                    </PrivateRoute>
                }
            />

            <Route 
              path="/admin/notifications" 
              element={
                  <PrivateRoute redirectUrl={"/admin/notifications"}>
                      <AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Notifications API_URL={API_URL} />} />
                  </PrivateRoute>
              }
          />

            {/* Add other routes as needed */}
            {/* <Redirect from="/" to="/" /> */}
            
            <Route component={NotFound}  ></Route>
            
          </Routes>
          
      </Router>
  );
};

export default App;
