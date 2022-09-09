import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const [user, setUsers] = useState("");
  const [customer, setCustomer] = useState("");
  const [roModels, setRoModels] = useState("");
  useEffect(()=>{
    getUsers();
    getCustomers();
    getRoModels();   
  })
 
  
  const getUsers = () =>{
    axios.get(`${process.env.React_App_Host}/counts/users`)
    .then((resp)=>{setUsers(resp.data.response)})
  }
  const getCustomers = () =>{
    axios.get(`${process.env.React_App_Host}/counts/customers`)
    .then((resp)=>{setCustomer(resp.data.response)})
  }
  const getRoModels = () =>{
    axios.get(`${process.env.React_App_Host}/counts/romodels`)
    .then((resp)=>{setRoModels(resp.data.response)})
  }
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
        <div className="row">
          {/* users */}
          <div className="col-md-6 col-xl-4">
            <NavLink to={"/admin/users"}>
              <div className="card daily-sales">
                <div className="card-block">
                  <h4 className="mb-2">Users</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h5 className="f-w-300 m-b-0">Total User: {user}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          {/* customers */}
          <div className="col-md-6 col-xl-4">
            <NavLink to={"/admin/customers"}>
              <div className="card daily-sales">
                <div className="card-block">
                  <h4 className="mb-2">Customers</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h5 className="f-w-300 m-b-0">Total Customers: {customer}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          {/* ro models */}
          <div className="col-md-6 col-xl-4">
            <NavLink to={"/admin/ro-models"}>
              <div className="card daily-sales">
                <div className="card-block">
                  <h4 className="mb-2">RO Models</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h5 className="f-w-300 m-b-0">Total Models: {roModels}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          {/* configure map pins */}
          <div className="col-md-12 col-xl-12">
            <NavLink to={"/admin/map-marker"}>
              <div className="card daily-sales">
                <div className="card-block">
                  <h4 className="mb-2">Configure Map Pins</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-12">
                      <h5 className="f-w-300 m-b-0">Map Markers</h5>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          {/* map optional */}
          {/* <div className="col-md-12 col-xl-12">
          
        </div> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
