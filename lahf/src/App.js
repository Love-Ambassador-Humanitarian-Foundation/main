import React from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import HeaderComponent from './components/Header'; // Import the header component
import LandingPage from './pages/LandingPage'; // Import the landing page component
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'; // Import the footer component
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
        <HeaderComponent /> {/* Include the header component */}
        <Routes>
          <Route path="/" element={<LandingPage/>} exact ></Route>
          <Route path="/about" element={<AboutPage/>} exact ></Route>
        </Routes>
        <Footer /> {/* Include the footer component */}
    </Router>
  );
};

export default App;
