import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa';
import '../styles/fonts/fontawesome/css/fontawesome-all.min.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function RoModule() {

  
    // delete a record
	const deleteRecord = (id) => {
    if(window.confirm('Are you sure that you wanted to delete that user Record')){
		fetch(`${process.env.React_App_Host}/deleteRoModels/` + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((response) => {
        toast.error(response.response)
				fetchAllModels();
			})
			.catch((error) => console.log("error", error));
    }
    
	};

  //fetch all Users

    const fetchAllModels = async ()=>{
      const url = `${process.env.React_App_Host}/roModels`;
     await axios
      .get(url)
      .then((response) => setModels(response.data.response))
      .catch((error) => console.log(error.message));
      // fetch(url).then(resp=>resp.json())
      // .then(resp=>setUser(resp.response))
      
    }

    const [models, setModels] = useState([])
    useEffect(()=>{
      const url = `${process.env.React_App_Host}/roModels`;
     axios
      .get(url)
      .then((response) => setModels(response.data.response))
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
                <h5 className="m-b-10">Ro Models</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                <li className="breadcrumb-item"><a href="#!">Ro Models</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <NavLink to={"/admin/add-ro-models"} className="btn btn-primary d-block"><FaPlusCircle /> &nbsp;Add Model</NavLink>
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
                  <h5>All Ro Models</h5>
                  
                </div>
                <div className="card-block px-0 py-3">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>Model ID</th>
                          <th>Model name</th>
                          <th colSpan={2}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {models.map((model, i) => 
                        <tr key={i}>
                          <td>
                            <h6 className="m-0">
                              {i+1}
                            </h6>
                          </td>
                          <td>
                            <h6 className="m-0">
                              {model.model_id}
                            </h6>
                          </td>
                          <td>
                            <h6 className="m-0">{model.model_name}</h6>
                          </td>

                          <td>
                            <NavLink to={`/admin/ro-models${model.id}`} className="label theme-bg text-white f-12">Edit Model</NavLink>
                            <a href='#!' onClick={() => deleteRecord(model.id)} className="label theme-bg2 text-white f-12">Delete Model</a>
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

export default RoModule
