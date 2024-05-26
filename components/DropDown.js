import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dropdown = ({ items }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    // Handle mouse enter event for an item
    const handleMouseEnter = (index) => {
        setHoveredItem(index);
    };

    // Handle mouse leave event for an item
    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    const dropdownStyle = {
        fontWeight: 600,
        padding: '8px 16px', // Adjust padding as needed
    }

    return (
        <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={dropdownStyle}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index === items.length - 1 && <NavDropdown.Divider />}
                    <Nav.Item>
                        <Link
                            to={item.to}
                            className='dropdown-item'
                            style={{
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                textDecoration: 'none',
                                backgroundColor: hoveredItem === index ? '#d7d7e9' : 'transparent',
                                color: hoveredItem === index ? 'black' : 'inherit',
                            }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.name}
                        </Link>
                    </Nav.Item>
                </React.Fragment>
            ))}
        </NavDropdown>
    );
};

export { Dropdown };
