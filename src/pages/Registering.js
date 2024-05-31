import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';


const Registering = ({ API_URL })=>{
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    console.log('params:=',params)
    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const response = await axios.get(API_URL+`/api/email/verify/${params.uid}/${params.token}`);
                if (response.data.success === false){
                    setError(response.data.message);
                    setIsLoading(false);
                    console.log(response.data);
                    message.error(response.data.message)
                }
                //console.log('response',response)
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                setIsLoading(false);
                navigate('/')
                console.log(response.data);
                message.success(response.data.message)
              } catch (error) {
                setError(error.message);
                setIsLoading(false);
                console.log(error);
                message.error(error.message)
              }
        }
        fetchData(API_URL);
    }, [API_URL, navigate, params]);

    if (loading) {
            return (
                <div  className='px-5'>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        {loading ? 'Registering...' : ''}
                    </Button>
                </div>
            );
    }

    if (error) {
            return <div>Error: {error}</div>;
    }
    return (
        <div  className='px-5'>
            Registratiion Complete
        </div>
    )
}
export default Registering;