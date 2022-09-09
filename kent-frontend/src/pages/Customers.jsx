import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import userimg from '../images/avatar-1.jpg';
import { FaPlusCircle } from 'react-icons/fa';
import '../styles/fonts/fontawesome/css/fontawesome-all.min.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function Customers() {


   // delete a record
	const deleteRecord = (id) => {
    if(window.confirm('Are you sure that you wanted to delete that user Record')){
		fetch(`${process.env.React_App_Host}/deletecustomer/` + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((response) => {
        toast.error(response.response)
				fetchAllCustomer();
			})
			.catch((error) => console.log("error", error));
    }
    
	};

  //fetch all customers

    const fetchAllCustomer = async ()=>{
      const url = `${process.env.React_App_Host}/customers`;
     await axios
      .get(url)
      .then((response) => setCostomers(response.data.response))
      .catch((error) => console.log(error.message));
      
    }

    const [customers, setCostomers] = useState([])
    useEffect(()=>{
      const url = `${process.env.React_App_Host}/customers`;
     axios
      .get(url)
      .then((response) => setCostomers(response.data.response))
      .catch((error) => console.log(error.message));
    },[])



  return (
    <>
     {/* breadcrumbs */}
      
     <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-9">
              <div className="page-header-title">
                <h5 className="m-b-10">Customers</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                <li className="breadcrumb-item"><a href="#!">All Customers</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <NavLink to={"/admin/add-customer"} className="btn btn-primary d-block"><FaPlusCircle /> &nbsp;Add Customer</NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* main content */}
     
      <div className="main-body">
        <div className="page-wrapper">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div className="card Recent-Users">
                <div className="card-header">
                  <h5>Recent Customers</h5>
                  
                </div>
                <div className="card-block px-0 py-3">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Ro Model</th>
                          <th colSpan={2}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {customers.map((customer, i) => 
                        <tr key={i}>
                          <td>
                            <h6 className="m-0">
                              <img className="rounded-circle m-r-10" style={{ width: "40px" }} src={userimg} alt="activity-user"/>
                              {customer.name}
                            </h6>
                          </td>
                          <td>
                            <h6 className="m-0">{customer.email}</h6>
                          </td>
                          <td>
                            <h6 className="m-0">{customer.phone}</h6>
                          </td>
                          <td style={{maxWidth: "250px"}}>
                            <h6 style={{whiteSpace: "pre-wrap"}} className="m-0">{customer.address}</h6>
                          </td>
                          <td style={{maxWidth: "160px"}}>
                            <h6 style={{whiteSpace: "pre-wrap"}} className="m-0">{customer.romodel}</h6>
                          </td>

                          <td>
                            <NavLink to={`/admin/customers${customer.id}`} className="label theme-bg text-white f-12">Edit</NavLink>
                            <a href='#!' onClick={() => deleteRecord(customer.id)} className="label theme-bg2 text-white f-12">Delete</a>
                          </td>
                        </tr>    
                               )
                              }     
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customers
