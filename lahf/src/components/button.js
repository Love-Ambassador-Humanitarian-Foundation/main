import React, { useState } from 'react';
import { Button as BtnComponent, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Button = (props) => {
  const { to, classname, text, onClick, icon } = props;
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Define the base style for the button
  const baseStyle = {
    backgroundColor: '#d7d7e9',
    fontWeight: 500,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px', // Adjust padding as needed
    textDecoration: 'none', // Remove text decoration for Links
  };

  // Define the hover style for the button
  const hoverStyle = {
    backgroundColor: '#34356b',
    color: 'white',
  };

  // Combine base and hover styles based on hover state
  const buttonStyle = {
    ...baseStyle,
    ...(isHovered && hoverStyle),
  };

  return (
    <>
      {to ? (
        <Link
          to={to}
          className='btn custombutton'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='me-2'>{text}</span>
          {icon}
        </Link>
      ) : (
        <BtnComponent
          className='btn custombutton'
          style={buttonStyle}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='me-2'>{text}</span>
          {icon}
        </BtnComponent>
      )}
    </>
  );
};

const NavLink = ({ text, className, to }) => {
    const [isActive, setIsActive] = useState(true);

  // Toggle active state
  const toggleActive = (e) => {
    var navlinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navlinks.length; i++) {
      navlinks[i].classList.remove('active');
      navlinks[i].style.backgroundColor = 'transparent';
      navlinks[i].style.color = 'black';
    }
    e.target.style.backgroundColor = '#34356b';
    e.target.style.color = 'white';

    setIsActive(!isActive);
  };

  // Define the base style for the button
  const baseStyle = {
    fontWeight: 500,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px', // Adjust padding as needed
    textDecoration: 'none', // Remove text decoration for Links
  };

  const activeStyle = {
    backgroundColor: '#34356b',
    color: 'white',
  };

  // Combine base and hover styles based on hover state
  const linkStyle = {
    ...baseStyle,
    ...(className === 'active' && activeStyle)
  };
    return (
        <Nav.Item>
        <Link
            to={to}
            className={`btn nav-link ${className} ${isActive ? 'active' : ''}`}
            style={linkStyle}
            onClick={toggleActive}
        >
            {text}
        </Link>
        </Nav.Item>
    );
}
export { Button, NavLink };
