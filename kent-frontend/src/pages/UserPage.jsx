import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import userimg from '../images/avatar-1.jpg';
import { FaPlusCircle } from 'react-icons/fa';
import '../styles/fonts/fontawesome/css/fontawesome-all.min.css';
import { toast } from 'react-toastify';
import axios from 'axios';


 function UserPage () {

   


    // delete a record
	const deleteRecord = (id) => {
    if(window.confirm('Are you sure that you wanted to delete that user Record')){
		fetch(`${process.env.React_App_Host}/deleteUser/` + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((response) => {
        toast.error(response.response)
				fetchAllUser();
			})
			.catch((error) => console.log("error", error));
    }
    
	};

  //fetch all Users

    const fetchAllUser = async ()=>{
      const url = `${process.env.React_App_Host}/users`;
     await axios
      .get(url)
      .then((response) => setUser(response.data.response))
      .catch((error) => console.log(error.message));
      // fetch(url).then(resp=>resp.json())
      // .then(resp=>setUser(resp.response))
      
    }

    const [users, setUser] = useState([])
    useEffect(()=>{
      const url = `${process.env.React_App_Host}/users`;
     axios
      .get(url)
      .then((response) => setUser(response.data.response))
      .catch((error) => console.log(error.message));
    },[])



  return (
    <>
      {/* breadcrumbs */}
      
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-10">
              <div className="page-header-title">
                <h5 className="m-b-10">Users</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                <li className="breadcrumb-item"><a href="#!">Users</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <NavLink to={"/admin/add-user"} className="btn btn-primary d-block"><FaPlusCircle /> &nbsp;Add User</NavLink>
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
                  <h5>Recent Users</h5>
                  
                </div>
                <div className="card-block px-0 py-3">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Username</th>
                          <th>Status</th>
                          <th colSpan={2}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {users.map((user, i) => 
                        <tr key={i}>
                          <td>
                            <h6 className="m-0">
                              <img className="rounded-circle m-r-10" style={{ width: "40px" }} src={userimg} alt="activity-user"/>
                              {user.name}
                            </h6>
                          </td>
                          <td>
                            <h6 className="m-0">{user.email}</h6>
                          </td>
                          <td className="text-right">
                            { user.loggedin ? 
                            <i className="fas fa-circle text-c-green f-10"></i> : <i className="fas fa-circle text-c-red f-10"></i>
                      }
                            </td>

                          <td>
                            <NavLink to={`/admin/users${user.id}`} className="label theme-bg text-white f-12">Edit User</NavLink>
                            <a href='#!' onClick={() => deleteRecord(user.id)} className="label theme-bg2 text-white f-12">Delete User</a>
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

export default UserPage
