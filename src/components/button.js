import React, { useState } from 'react';
import { Button as BtnComponent, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Button = ({ to, props, classname, style, text, onClick, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseStyle = {
    backgroundColor: '#d7d7e9',
    fontWeight: 500,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    textDecoration: 'none',
  };

  const hoverStyle = {
    backgroundColor: '#34356b',
    color: 'white',
  };

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
          style={{ border: '0px', color: 'black', ...buttonStyle }}
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

const NavLink = ({ text, className, to, fwicon, light, onClick }) => {
  const [isActive, setIsActive] = useState(true);

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

  const baseStyle = {
    fontWeight: 500,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    textDecoration: 'none',
  };

  const activeStyle = {
    backgroundColor: '#34356b',
    color: 'white',
  };

  const linkStyle = {
    ...baseStyle,
    ...(className === 'active' && activeStyle),
  };

  return (
    <Nav.Item className='nav-link d-flex justify-content-left align-items-center' onClick={onClick}>
      <span className={light ? 'text-white' : 'text-dark'}>{fwicon}</span>
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
};

const IconButton = ({ to, classname, style, onClick, icon, animation, hover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseStyle = {
    backgroundColor: 'transparent',
    border: '0px',
    fontWeight: 500,
    fontSize: '26px',
    borderRadius: '4px',
    display: 'flex',
    color: 'black',
    alignItems: 'center',
    padding: '4px 12px',
    textDecoration: 'none',
  };

  let hoverStyle = {
    backgroundColor: '#d7d7e9',
    color: 'black',
  };

  if (hover === false) {
    hoverStyle = {};
  }

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

export { Button, NavLink, IconButton };
