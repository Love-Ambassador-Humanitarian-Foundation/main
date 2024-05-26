import React, { useState } from 'react';
import { Card, Button as Btn} from 'react-bootstrap';
import { Button} from './button';
import { PlusOutlined, MinusOutlined, LoginOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';

const CustomAccordion = ({ items, onClick,isloggedIn }) => {
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
            {item.content.includes('Not Ongoing')?
            <span >
              <p style={{'color':'red'}}>Not Ongoing:</p>
              {item.content.replace('Not Ongoing:', '')}
              {(item.title.includes('Fund')||item.title.includes('Donation'))?
              <Button to={`${item.link}/${item.title}-${item.content.replace('Not Ongoing:', '')}`} text="Contribute" style={{width:'140px', maxWidth:'140px', marginLeft:'auto'}} icon={<FontAwesomeIcon icon={faHandHoldingDollar} size='xl' style={{ color: 'green' }} />} />
              :
              <>
                {isloggedIn? 
                  <></>
                  :
                  <Button to="/login" text="Log In" style={{width:'140px', maxWidth:'140px', marginLeft:'auto'}} icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                }
              </>
              }
            </span>
            
            :
            <span >
              <p style={{'color':'green'}}>Ongoing:</p>
              {item.content.replace('Ongoing:', '')}
              {(item.title.includes('Fund')||item.title.includes('Donation'))?
              <Button to={`${item.link}/${item.title}-${item.content.replace('Ongoing:', '')}`}  text="Contribute" style={{width:'140px', maxWidth:'140px', marginLeft:'auto'}} icon={<FontAwesomeIcon icon={faHandHoldingDollar} size='xl' style={{ color: 'green' }} />} />
              :
              <>
                {isloggedIn? 
                  <></>
                  :
                  <Button to="/login" text="Log In" style={{width:'140px', maxWidth:'140px', marginLeft:'auto'}} icon={<LoginOutlined style={{ color: '#ec3237' }} />} />
                }
              </>
              }
            </span>
            }
            
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CustomAccordion;
