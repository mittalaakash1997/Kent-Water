import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function EditUser () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [npassword, setNPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const postData = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("please enter Name", {
        position: toast.POSITION.TOP_CENTER
      })
        }
        else if (!email) {
            toast.error("please enter Email", {
        position: toast.POSITION.TOP_CENTER
      })
        }
        else if (!phone) {
            toast.error("please enter Phone Number", {
        position: toast.POSITION.TOP_CENTER
      })
        }
        else if (!password && !id) {
            
                toast.error("please enter Password", {
                    position: toast.POSITION.TOP_CENTER
                  })
         
                
            
            
        }
        else{
            if(!id){
                addUsersf();
            }
            else{
                updateUsersf(id);
            }
        }
    }
    // add user
    const addUsersf = () => {
        axios.post(`${process.env.React_App_Host}/addUsers`, {
            name,
            email,
            phone,
            password,
            userRole
        })
        navigate("/admin/users");
        toast.success("New User Added");
    }
    
    // update user
    const updateUsersf = (id) => {
        if(!npassword){
           axios.put(`${process.env.React_App_Host}/updateUsers/`, {
            id,    
            name,
                email,
                phone,
                userRole
            })
        }
        else{
            axios.put(`${process.env.React_App_Host}/updateUsers/`, {
            id,    
            name,
                email,
                phone,
                npassword,
                userRole
            })
        }
        navigate("/admin/users");
        toast.success("User Edited");
    }
    
    const {id} = useParams();

    // single user

    useEffect(()=>{
        
        if(id){
            getSingleUser(id);
        }
          
      },[id]);
    
      const getSingleUser = async (id)=>{
        const url = `${process.env.React_App_Host}/singleUser/` + id;
        fetch(url).then(resp=>resp.json())
        .then(resp=>{
            if(resp.status === 200){
                // console.log(resp.response[0])
                setName(resp.response[0].name);
                    setEmail(resp.response[0].email);
                    setPhone(resp.response[0].phone);
                    setPassword(resp.response[0].password);
                    setUserRole(resp.response[0].isadmin);
            }
        }
        )
      }


//update user


    
        return (
            <>
                {/* breadcrumb */}
                <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className="page-header-title">
                                {
                                        !id ?
                                        <h5 className="m-b-10">Add Users</h5>                                        
                                        :
                                        <h5 className="m-b-10">Update Users</h5>                                         
                                        
                                    }
                                </div>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/users"}>Users</NavLink></li>
                                    {
                                        !id ?
                                            <li className="breadcrumb-item"><NavLink to={"/admin/add-user"}>Add User</NavLink></li>
                                        :
                                            <li className="breadcrumb-item"><NavLink to={`/admin/users${id}`}>Update User</NavLink></li>
                                        
                                    }
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
                                    {
                                    !id ?
                                    <h5>Add User</h5>
                                    :
                                    <h5>Edit User</h5>
                                }
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={postData}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='name'>Name</label>
                                                        <input type="text" className="form-control mt-2" name='name' onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter The Name"/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='phone'>Phone No</label>
                                                        <input type="tel" className="form-control mt-2" name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Phone Number"/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='userRole'>Role of User</label>
                                                        <select className="form-control mt-2" id="userRole" name='userRole' onChange={(e) => setUserRole(e.target.value)} value={userRole}>
                                                            <option value={0}>User</option>
                                                            <option value={1}>Admin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    
                                                    
                                                    {
                                        !id ?
                                        <div className="form-group mb-3">
                                                        <label htmlFor='email'>Email Address</label>
                                                        <input type="email" className="form-control mt-2" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address"/>
                                                    </div>
                                        :
                                        <div className="form-group mb-3">
                                                        <label htmlFor='email'>Email Address</label>
                                                        <input type="email" className="form-control mt-2" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address" readOnly/>
                                                    </div>
}
                                                    {
                                        !id ?
                                        <div className="form-group mb-3">
                                        <label htmlFor='email'>Password</label>
                                        <input type="text" className="form-control mt-2" name='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password"/>
                                    </div>
                                        :
                                        <div className="form-group mb-3">
                                        <label htmlFor='email'> Update Password</label>
                                        <input type="text" className="form-control mt-2" name='npassword' onChange={(e) => setNPassword(e.target.value)} value={npassword} placeholder="Enter New Password"/>
                                    </div>
                                        
                                    }

                                                </div>
                                            </div>
                                            <button type='submit' className="btn btn-primary">{id ? "update" : "Submit"}</button>
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
