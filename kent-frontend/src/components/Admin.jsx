import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import MapMarkers from '../pages/MapMarkers';
import RoModule from '../pages/RoModule';
import UserPage from '../pages/UserPage';
import Sidebar from '../components/Sidebar';
import Profile from '../pages/Profile';
import EditUser from '../pages/EditUser';
import { ToastContainer } from 'react-toastify';
import EditRoModule from '../pages/EditRoModule';
import EditCustomer from '../pages/EditCustomer';
import EditMapMarker from '../pages/EditMapMarker';
import { useNavigate } from 'react-router-dom';

const Admin = ()=> {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
    navigate('/login');
    }
    if( !localStorage.getItem('access') ){
        navigate('/');
      }
// console.log(uAccess)
    
}, [navigate])
  return (
    <>
       <Sidebar>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/add-customer" element={<EditCustomer />} />
            <Route path="/customers:id" element={<EditCustomer />} />
            <Route path="/map-marker" element={<MapMarkers />} />
            <Route path="/map-marker:id" element={<EditMapMarker />} />
            <Route path="/ro-models" element={<RoModule />} />
            <Route path="/ro-models:id" element={<EditRoModule />} />
            <Route path="/add-ro-models" element={<EditRoModule />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-user" element={<EditUser />} />
            <Route path="/users:id" element={<EditUser />} />
          </Routes>
        </Sidebar>
    </>
  )
}

export default Admin
