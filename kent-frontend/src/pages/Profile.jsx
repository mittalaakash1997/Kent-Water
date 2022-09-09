import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';

function Profile() {
  const userId = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refclose = useRef(null);
  const handleClick = () => {
    if(!password){
       fetch(`${process.env.React_App_Host}/updateProfile/`, {
        method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({name, phone})
       })
       .then((response) => {toast.success(response.response)})
       .catch((err)=>{
        console.log("err")
       })
   }
   else{
        fetch(`${process.env.React_App_Host}/updateProfile/`, {
          method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({name, email, phone, password})
       })
       .then((response) => {toast.success(response.response)})
       .catch((err)=>{
        console.log("err")
       })
       
   }
   refclose.click()
}

  useEffect(() => {
    getLoginUser(userId);
  }, [userId]);





  // single customer

  const getLoginUser = async (userId) => {
    const url = `${process.env.React_App_Host}/getloginuser/`;
    fetch(url, {
      method: "get",
      headers: {
        "auth-token": userId,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status === 200) {
          // console.log(resp.response[0])
          setName(resp.response.name);
          setEmail(resp.response.email);
          setPhone(resp.response.phone);
        }
      });
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-10">
              <div className="page-header-title">
                <h5 className="m-b-10">My Profile</h5>
              </div>

              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  {
                    localStorage.getItem("access") ?  <NavLink to={"/admin"}>
                    <i className="feather icon-home"></i>
                  </NavLink> :
                   <NavLink to={"/"}>
                   <i className="feather icon-home"></i>
                 </NavLink>
                  }
                 
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">My Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="card col-md-8">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-8">
                <p className="mb-0">{name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-8">
                <p className="mb-0">{email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-4">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-8">
                <p className="mb-0">{phone}</p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-8">
                <button className="btn btn-primary" onClick={handleShow}>
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Update Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter The Name"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone">Phone No</label>
                <input
                  type="tel"
                  className="form-control mt-2"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control mt-2"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Set New Password</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" rfe={refclose} onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleClick}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Profile;
