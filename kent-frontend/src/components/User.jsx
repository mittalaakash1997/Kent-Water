import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Sidebar from './User/SidebarUser';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import EditCustomer from '../pages/EditCustomer';
import GoMap from './User/GoMap';
import CustomerAdded from './User/CustomerAdded';

const User = ()=> {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
    navigate('/login');
    }
    if( localStorage.getItem('access') ){
        navigate('/admin');
      }
      // console.log(uAccess)
    
}, [navigate])
  return (
    <div>
      <Sidebar>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<GoMap />} />       
            <Route path="/profile" element={<Profile />} />       
            <Route path="/add-customer" element={<EditCustomer />} />       
            <Route path="/customer-detail" element={<CustomerAdded />} />       
          </Routes>
      </Sidebar>
    </div>
  )
}

export default User
