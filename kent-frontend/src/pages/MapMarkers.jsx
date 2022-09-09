import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

function MapMarkers() {


  const [mapMarkers, setMapMarkers] = useState([])
  useEffect(()=>{
    const url = `${process.env.React_App_Host}/roModels`;
   axios
    .get(url)
    .then((response) => setMapMarkers(response.data.response))
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
                <h5 className="m-b-10">Map Markers Configuration</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                <li className="breadcrumb-item"><a href="#!">Map Markers</a></li>
              </ul>
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
                  <h5>All Map Markers Details</h5>
                  
                </div>
                <div className="card-block px-0 py-3">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                        <th>S. No</th>
                          <th>Model ID</th>
                          <th>Model Name</th>
                          <th>Pin Colour</th>
                          <th colSpan={2}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {mapMarkers.map((mmapMark, i) => 
                        <tr key={i}>
                          <td> 
                            <h6 className="m-0"> {i+1}</h6>
                          </td>
                          <td> 
                            <h6 className="m-0">{mmapMark.model_id}</h6>
                          </td>
                          <td>
                            <h6 className="m-0">{mmapMark.model_name}</h6>
                          </td>
                          <td>
                            <h6 className="m-0">
                            <input type="color" id={`mapMarker${i}`} name={`mapMarker${i}`}
           value={mmapMark.model_pin_color} readOnly/>
           </h6>
                          </td>
                         
                          <td>
                            <NavLink to={`/admin/map-marker${mmapMark.id}`} className="label theme-bg text-white f-12">Edit Marker</NavLink>
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

export default MapMarkers
