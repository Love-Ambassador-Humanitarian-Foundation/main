import React, { useState } from 'react';
import { Button as BtnComponent, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Button = ({ to, props, classname, style, text, onClick, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(classname);

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
    ...style,
    ...(isHovered && hoverStyle),
  };

  return (
    <>
      {to ? (
        <Link
          to={{ pathname: to, state: { item: { customProp: props } } }}
          className='btn'
          style={buttonStyle}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='me-2'>{text}</span>
          {icon}
        </Link>
      ) : (
        <BtnComponent
          className='btn'
          style={{ border: '0px', color:'black',...buttonStyle}} // Include border style inline
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

const NavLink = ({ text, className, to, fwicon, light}) => {
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
        <Nav.Item className='nav-link d-flex justify-content-left align-items-center'>
          
          <span className={light ?'text-white':'text-dark'}>{fwicon}</span>
          <Link
              to={to}
              style={linkStyle}
              className={`btn nav-link ${className} ${isActive ? 'active' : ''}`}
              
              onClick={toggleActive}
          >
              
              {text}
        </Link>
        </Nav.Item>
    );
}

const IconButton = (props) => {
  const { to, classname, style, onClick, icon, animation,hover } = props;
  const [isHovered, setIsHovered] = useState(false);
  console.log(classname,animation,hover);

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
    backgroundColor: 'transparent',
    border:'0px',
    fontWeight: 500,
    fontSize: '26px',
    borderRadius: '4px',
    display: 'flex',
    color: 'black',
    alignItems: 'center',
    padding: '4px 12px', // Adjust padding as needed
    textDecoration: 'none', // Remove text decoration for Links
  };

  // Define the hover style for the button
  var hoverStyle = {
    backgroundColor: '#d7d7e9',
    color: 'black',
  };
  if (hover === false) {
    hoverStyle = {};
  }
  

  // Combine base and hover styles based on hover state
  const buttonStyle = {
    ...baseStyle,
    ...style,
    ...(isHovered && hoverStyle),
  };

  return (
    <>
      {to ? (
        <Link
          to={to}
          className='btn'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {icon}
        </Link>
      ) : (
        <BtnComponent
          className='btn'
          style={buttonStyle}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {icon}
          
        </BtnComponent>
      )}
    </>
  );
};
export { Button, NavLink,IconButton };
