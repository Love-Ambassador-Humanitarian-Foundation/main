import React from 'react';
import HeaderComponent from '../components/AdminHeader';
import Footer from '../components/Footer';
//import { SearchOutlined} from '@ant-design/icons';
import { Input } from 'antd';

const { Search } = Input;

const Dashboard = ({ Companyname, isloggedIn }) => {
    return (
        <>
            <HeaderComponent Companyname={Companyname} isloggedIn={isloggedIn} />
            
            <div className="dashboard-content container py-5">
                <div className='mt-5'>
                    <Search placeholder="Search" className="search-bar me-4" /> {/* prefix={<SearchOutlined />}*/}
                </div>
                {/* Add your dashboard content here */}
                <h1>Welcome to the Dashboard</h1>
                <p>This is the main content of your dashboard.</p>
            </div>
            <Footer Companyname={Companyname} /> {/* Include the footer component */}
        </>
    );
};

export default Dashboard;
