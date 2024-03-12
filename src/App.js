import React from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import HeaderComponent from './components/Header'; // Import the header component
import LandingPage from './pages/LandingPage'; // Import the landing page component
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'; // Import the footer component
import 'bootstrap/dist/css/bootstrap.min.css';

const Companyname = 'LAHF';
const App = () => {
  return (
    <Router>
        <HeaderComponent Companyname={Companyname} /> {/* Include the header component */}
        <Routes>
          <Route path="/" element={<LandingPage Companyname={Companyname}/>} exact ></Route>
          <Route path="/about" element={<AboutPage Companyname={Companyname}/>} exact ></Route>
        </Routes>
        <Footer Companyname={Companyname} /> {/* Include the footer component */}
    </Router>
  );
};

export default App;
