import React, { useState } from 'react';
import { Card, Button as Btn } from 'react-bootstrap';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CustomAccordion = ({ items, onClick, isLoggedIn }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    onClick(index);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Card key={index} className="mb-2 m-2">
          <Card.Header
            onClick={() => toggleAccordion(index)}
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-center m-1"
          >
            <Btn
              variant="link"
              className="text-dark text-decoration-none"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              {item.title}
            </Btn>
            <Btn
              variant="link"
              className="text-dark text-decoration-none"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              {activeIndex === index ? <MinusOutlined /> : <PlusOutlined />}
            </Btn>
          </Card.Header>
          <Card.Body
            className={activeIndex === index ? 'show' : 'collapse'}
            aria-expanded={activeIndex === index}
          >
            <p style={{ textAlign: 'justify', textIndent: '40px' }}>{item.content.slice(0, 500)}</p>{' '}
            {activeIndex === index ? (
              <span
                className="text-primary"
                onClick={() => navigate(`/about#${item.hash}`)}
                style={{ cursor: 'pointer' }}
              >
                Read more...
              </span>
            ) : null}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CustomAccordion;
