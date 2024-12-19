import React from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the landing page component
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/Events';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PaymentPage from './pages/Payment';
import ContributePage from './pages/Contribute';
import AdminMain from './pages/AdminMain';
import Dashboard from './pages/AdminDashboard';
import Partners from './pages/AdminPartners';
import AdminEvents from './pages/AdminEvents';
import AdminProjects from './pages/AdminProject';
import Payments from './pages/AdminPayments';
import Branches from './pages/AdminBranches';
import AdminScholarships from './pages/AdminScholarships';
import AddAdminScholarship from './pages/AdminAddScholarship'
import AdminScholarship from './pages/AdminScholarshipdetail';
import AdminScholarshipApplicants from './pages/AdminScholarshipApplicants.js';
import AdminScholarshipApplicant from './pages/AdminScholarshipApplicantDetails.js';
import AdminAbout from './pages/AdminAbout.js';
import AdminUsers from './pages/AdminUsers';
import AdminUser from './pages/AdminUserDetail';
import AddAdminUser from './pages/AdminAddUser.js';
import AdminPartner from './pages/AdminPartnerDetail';
import AdminPayment from './pages/AdminPaymentDetail';
import AdminBranch from './pages/AdminBranchDetail';
import AdminEvent from './pages/AdminEventDetail';
import AdminProject from './pages/AdminProjectDetail.js';
import PrivateRoute from './routes/PrivateRoute.js';
import LogoutPage from './pages/Logout.js';
import EmailVerificationPage from './pages/EmailVerificationPage.js';
import Registering from './pages/Registering.js';
import UserProfilePage from './pages/Profile';
import AddAdminScholarshipApplicant from './pages/AdminAddScholarshipApplicant.js';
import AddAdminPartner from './pages/AdminAddPartners.js';
import AddAdminEvent from './pages/AdminAddEvents.js';
import AdminEventParticipants from './pages/AdminEventParticipants.js';
import AddAdminEventParticipant from './pages/AdminAddEventParticipant.js';
import AddAdminProject from './pages/AdminAddProject.js';
import AdminProjectParticipants from './pages/AdminProjectParticipants.js';
import AddAdminProjectParticipant from './pages/AdminAddProjectParticipant.js';
import AdminProfilePage from './pages/AdminProfile.js';
import AdminNewsletters from './pages/AdminNewsletters.js';
import AdminNewsletterDetail from './pages/AdminNewsletterDetail.js';
import AddAdminNewsletter from './pages/AdminAddNewsletterDetail.js';
import AdminNewsletterReceipients from './pages/AdminNewsletterReceipients.js';
import AdminNewsletterReceipientDetail from './pages/AdminNewsletterReceipientDetail.js';
import ResetPasswordPage from './pages/ResetPasswordPage.js';
import PasswordResetLinkSentPage from './pages/PasswordResetLinkSentPage.js';
import NotFoundPage from './pages/NotFound';
import ForgottenPasswordPage from './pages/ForgottenPassword.js';
import Scholarships from './pages/Scholarships.js';
import Scholarship from './pages/ScholarshipDetails.js';
import ScholarshipApplication from './pages/ScholarshipApplication.js';
import EventDetail from './pages/EventDetails.js';
import ProjectPage from './pages/Projects.js';
import ProjectDetail from './pages/ProjectDetails.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';





const Companyname = 'LAHF';
const App = ({API_URL}) => {
  
  return (
    <Router>
          <Routes>
            <Route path="/" element={<LandingPage API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/about" element={<AboutPage API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/events" element={<EventsPage API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/events/:id" element={<EventDetail API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/projects" element={<ProjectPage API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/projects/:id" element={<ProjectDetail API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/contribute" element={<PrivateRoute redirectUrl={"/admin/contribute"} API_URL={API_URL} ><ContributePage API_URL={API_URL} Companyname={Companyname} /></PrivateRoute>} exact ></Route>
            <Route path="/scholarships" element={<Scholarships API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/scholarships/:id" element={<Scholarship API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/scholarships/:id/apply" element={<ScholarshipApplication API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/contact" element={<ContactUsPage API_URL={API_URL} Companyname={Companyname} />} exact ></Route>
            <Route path="/login" element={<LoginPage API_URL={API_URL} />} exact ></Route>
            <Route path="/signup" element={<SignUpPage API_URL={API_URL} />} exact ></Route>
            <Route path="/logout" element={<LogoutPage API_URL={API_URL} />} exact ></Route>
            <Route path="/email/verify" element={<EmailVerificationPage API_URL={API_URL} />} exact ></Route>
            <Route path="/email/registration/:uid/:token" element={<Registering API_URL={API_URL} />} exact ></Route>
            <Route path="/profile/:id" element={<PrivateRoute redirectUrl={"/profile/:id"} API_URL={API_URL} ><UserProfilePage API_URL={API_URL} /></PrivateRoute>} exact ></Route>
            <Route path="/password/forgotten" element={<ForgottenPasswordPage API_URL={API_URL} />} exact ></Route>
            <Route path="/password/reset/sent" element={<PasswordResetLinkSentPage API_URL={API_URL} />} exact ></Route>
            <Route path="/password/reset/:uid/:token" element={<ResetPasswordPage API_URL={API_URL} />} exact ></Route>
            <Route path="/payment/:variable" element={<PrivateRoute redirectUrl={"/admin/payment/:variable"} API_URL={API_URL} ><PaymentPage API_URL={API_URL} /></PrivateRoute>} ></Route>
            <Route path="/admin/users" element={<PrivateRoute redirectUrl={"/admin/users"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminUsers API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/users/add" element={<PrivateRoute redirectUrl={"/admin/users/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminUser API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/users/:id" element={<PrivateRoute redirectUrl={"/admin/users/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminUser API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<PrivateRoute redirectUrl={"/admin/dashboard"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Dashboard API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/about" element={<PrivateRoute redirectUrl={"/admin/about"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminAbout API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships" element={<PrivateRoute redirectUrl={"/admin/scholarships"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminScholarships API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/add" element={<PrivateRoute redirectUrl={"/admin/scholarships/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminScholarship API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminScholarship API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminScholarshipApplicants API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants/add" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminScholarshipApplicant API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/scholarships/:id/applicants/:applicantid" element={<PrivateRoute redirectUrl={"/admin/scholarships/:id/applicants/:applicantid"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminScholarshipApplicant API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/partners" element={<PrivateRoute redirectUrl={"/admin/partners"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Partners API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/partners/add" element={<PrivateRoute redirectUrl={"/admin/partners/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminPartner API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/partners/:id" element={<PrivateRoute redirectUrl={"/admin/partners/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AdminPartner API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events" element={<PrivateRoute redirectUrl={"/admin/events"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminEvents API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events/add" element={<PrivateRoute redirectUrl={"/admin/events/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminEvent API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events/:id" element={<PrivateRoute redirectUrl={"/admin/events/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AdminEvent API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events/:id/participants" element={<PrivateRoute redirectUrl={"/admin/events/:id/participants"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AdminEventParticipants API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/events/:id/participants/add" element={<PrivateRoute redirectUrl={"/admin/events/:id/participants/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AddAdminEventParticipant API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/projects" element={<PrivateRoute redirectUrl={"/admin/projects"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminProjects API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/projects/add" element={<PrivateRoute redirectUrl={"/admin/projects/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminProject API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/projects/:id" element={<PrivateRoute redirectUrl={"/admin/projects/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AdminProject API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/projects/:id/participants" element={<PrivateRoute redirectUrl={"/admin/projects/:id/participants"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AdminProjectParticipants API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/projects/:id/participants/add" element={<PrivateRoute redirectUrl={"/admin/projects/:id/participants/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<AddAdminProjectParticipant API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute redirectUrl={"/admin/payments"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<Payments API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/payments/:id" element={<PrivateRoute redirectUrl={"/admin/payments/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminPayment API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/branches" element={<PrivateRoute redirectUrl={"/admin/branches"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname}  screen={<Branches API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/branches/:name" element={<PrivateRoute redirectUrl={"/admin/branches/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminBranch API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/profile" element={<PrivateRoute redirectUrl={"/admin/profile"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminProfilePage API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/newsletters" element={<PrivateRoute redirectUrl={"/admin/newsletters"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminNewsletters API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/newsletters/:id" element={<PrivateRoute redirectUrl={"/admin/newsletters/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminNewsletterDetail API_URL={API_URL} />} /></PrivateRoute> } />
            <Route path="/admin/newsletters/add" element={<PrivateRoute redirectUrl={"/admin/newsletters/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminNewsletter API_URL={API_URL} />} /></PrivateRoute> } />
            <Route path="/admin/newsletters/receipients" element={<PrivateRoute redirectUrl={"/admin/newsletters/receipients"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminNewsletterReceipients API_URL={API_URL} />} /></PrivateRoute>} />
            <Route path="/admin/newsletters/receipients/:id" element={<PrivateRoute redirectUrl={"/admin/newsletters/receipients/:id"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AdminNewsletterReceipientDetail API_URL={API_URL} />} /></PrivateRoute> } />
            <Route path="/admin/newsletters/receipients/add" element={<PrivateRoute redirectUrl={"/admin/newsletters/receipients/add"} API_URL={API_URL} ><AdminMain API_URL={API_URL} Companyname={Companyname} screen={<AddAdminNewsletter API_URL={API_URL} />} /></PrivateRoute> } />
            {/* Add other routes as needed */}
            {/* <Redirect from="/" to="/" /> */}
            
            <Route component={NotFoundPage}  ></Route>
            
          </Routes>
          
      </Router>
  );
};

export default App;
