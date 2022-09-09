import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditMapMarker() {
    const [modelId, setModelId] = useState('');
    const [modelName, setModelName] = useState('');
    const [modelColor, setModelColor] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const postData = (e) => {
        e.preventDefault();
        axios.put(`${process.env.React_App_Host}/mapmarkercolor/`, {
      id,
      modelId,
      modelName,
      modelColor
    })
    navigate("/admin/map-marker");
    toast.success("Map Marker Edited");
      }
    // single user

    useEffect(()=>{
        
        if(id){
            getSingleRoModel(id);
        }
          
      },[id]);
    
      const getSingleRoModel = async (id)=>{
        const url = `${process.env.React_App_Host}/singleRoModels/` + id;
        fetch(url).then(resp=>resp.json())
        .then(resp=>{
            if(resp.status === 200){
                // console.log(resp.response[0])
                setModelId(resp.response[0].model_id);
                setModelName(resp.response[0].model_name);
                setModelColor(resp.response[0].model_pin_color);
            }
        }
        )
      }
  return (
    <>
      {/* breadcrumb */}
 <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className="page-header-title">
                                    <h5 className="m-b-10">Update Ro Map Marker</h5>    
                                </div>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={"/admin/admin"}><i className="feather icon-home"></i></NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/map-marker"}>Map Marker</NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={`/admin/map-marker${id}`}>Update Map Marker</NavLink></li>
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
                                        <form onSubmit={postData}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='model id'>Model ID</label>
                                                        <input type="text" className="form-control mt-2" name='ModelId' value={modelId} readOnly/>
                                                    </div>

                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='model name'>Model Name</label>
                                                        <input type="text" className="form-control mt-2" name='modelName' value={modelName} readOnly/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='marker color'>Model Name</label>
                                                        <input type="color" className="form-control mt-2" name='model_pin_color' onChange={(e) => setModelColor(e.target.value)} value={modelColor} style={{height: "40px"}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' className="btn btn-primary">update</button>
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

export default EditMapMarker
