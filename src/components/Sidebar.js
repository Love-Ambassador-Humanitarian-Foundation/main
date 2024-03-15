import React from 'react';
import { Layout, Menu} from 'antd';
import { HeartFilled} from '@ant-design/icons';
import { Button, NavLink} from './button';

const { Sider } = Layout;
const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
    const collapse =()=>{
        setIsMenuOpen(false);
    }
    return (
      <Sider className='sider' collapsible collapsed={!isMenuOpen} onCollapse={()=>(collapse())} style={{position:'absolute',zindex:'999', left:'0px', top:'71px'}}>
        
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1"><NavLink to="/" text="Home" className="active m-2" /></Menu.Item>
          <Menu.Item key="2"><NavLink to="/about" text="About" className="m-2" /></Menu.Item>
          <Menu.Item key="3"><NavLink to="/events" text="Events" className="m-2" /></Menu.Item>
          <Menu.Item key="1"><NavLink to="/contact" text="Contact" className="m-2" /></Menu.Item>
          <Menu.Item key="2"><NavLink to="/login" text="Login" className="m-2" /></Menu.Item>
          <Menu.Item key="3"><Button to="/signup" text="Contribute" icon={<HeartFilled style={{ color: '#ec3237' }} />} /></Menu.Item>
        </Menu>
      </Sider>
    );
  };
export default Sidebar  