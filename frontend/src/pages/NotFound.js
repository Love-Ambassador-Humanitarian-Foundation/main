import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f0f2f5' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <img
                    src="https://via.placeholder.com/400x300?text=404+Not+Found"
                    alt="404 Not Found"
                    style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}
                />
                <h1 style={{ fontSize: '72px', color: '#34356b' }}>404</h1>
                <h2 style={{ fontSize: '24px', color: '#555' }}>Oops! Page not found</h2>
                <p style={{ fontSize: '16px', color: '#666' }}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <Button type="primary" size="large" style={{ marginTop: '20px' }}>
                    <Link to="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
