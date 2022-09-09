import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';



function EditUser () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    


    const postData = () => {
        axios.post(`${process.env.React_App_Host}/addUsers`, {
            name,
            email,
            phone,
            password,
            userRole
        })
    }
    
    
        return (
            <>
                {/* breadcrumb */}
                <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className="page-header-title">
                                    <h5 className="m-b-10">Add Users</h5>
                                </div>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/users"}>Users</NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/add-user"}>Add User</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form */}
                <div className="main-body">
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Add Users</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='name'>Name</label>
                                                        <input type="text" className="form-control mt-2" name='name' onChange={(e) => setName(e.target.value)} placeholder="Enter The Name" required />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='phone'>Phone No</label>
                                                        <input type="tel" className="form-control mt-2" name='phone' onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='role'>Role of User</label>
                                                        <select className="form-control" id="roleSelect" name='userRole' onChange={(e) => setUserRole(e.target.value)}>
                                                            <option value={0}>User</option>
                                                            <option value={1}>Admin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='email'>Email Address</label>
                                                        <input type="email" className="form-control mt-2" name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='email'>Password</label>
                                                        <input type="text" className="form-control mt-2" name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                                    </div>

                                                </div>
                                            </div>
                                            <button type='submit' onClick={postData} className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    
}

export default EditUser
