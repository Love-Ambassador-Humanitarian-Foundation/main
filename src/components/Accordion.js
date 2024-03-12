import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const CustomAccordion = ({ items, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    onClick(index);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Card key={index} className="mb-2 m-2">
          <Card.Header onClick={() => toggleAccordion(index)} style={{cursor:'pointer'}} className="d-flex justify-content-between align-items-center m-1">
            <Button
              variant="link"
              className="text-dark text-decoration-none"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              {item.title}
            </Button>
            <Button
              variant="link"
              className="text-dark text-decoration-none"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              {activeIndex === index ? <MinusOutlined /> : <PlusOutlined />}
            </Button>
          </Card.Header>
          <Card.Body
            className={activeIndex === index ? 'show' : 'collapse'}
            aria-expanded={activeIndex === index}
          >
            {item.content}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CustomAccordion;
