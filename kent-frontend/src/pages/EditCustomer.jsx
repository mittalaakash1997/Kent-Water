import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Geocode from "react-geocode";


Geocode.setApiKey(process.env.React_App_Google_Map_Api_Key);

function EditCustomer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [roModel, setRoModel] = useState('');
    const [optionModels, setOptionModels] = useState([]);
    const { id } = useParams();
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
        else if (!address) {
            toast.error("please enter Address", {
        position: toast.POSITION.TOP_CENTER
      })
        }
        else if (!roModel) {
            toast.error("please select Ro Model", {
        position: toast.POSITION.TOP_CENTER
      })
        }
        else {
            if (!id) {
                addCustomer();
            }
            else {
                updateCustomer(id);
            }
        }
    }

    // add customer
    const addCustomer = () => {
         Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng)
        axios.post(`${process.env.React_App_Host}/addcustomer`, {
            name: name,
            email: email,
            phone: phone,
            address: address,
            roModel: roModel,
            latCordinate: lat,
            lngCordinate: lng,
        })
        .then((resp)=>{
            if(resp.data.status===200){
                if(localStorage.getItem("access")){
                    navigate("/admin/customers")
                    toast.success("New Customer Added")
                }
                else{
                    navigate("/customer-detail", {state:{name:name ,email: email, phone: phone, roModel: roModel, address: address}})
                    toast.success("New Customer Added")
                    }
            }
            else{
                toast.error("Something goes wrong Please Try Again Later")
            }
        })

      },
      (error) => {
        console.error(error);
      }
    );
        
        
    }
    // update customer
    const updateCustomer = (id) => {
        Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
            //   console.log(lat, lng)
              axios.put(`${process.env.React_App_Host}/updatecustomer/`, {
                id: id,
                name: name,
                email: email,
                phone: phone,
                address: address,
                roModel: roModel,
                latCordinate: lat,
                lngCordinate: lng,
            })
              .then((resp)=>{
                  if(resp.data.status===200){
                    navigate("/admin/customers");
                    toast.success("Customer Details Updates");
                  }
                  else{
                      toast.error("Something goes wrong Please Try Again Later")
                  }
              })
      
            },
            (error) => {
              console.error(error);
            }
          );  
    }

   
    useEffect(() => {

        getRoModul();
        if (id) {
            getSingleCustomer(id);
        }

    }, [id]);


    // single customer

    const getSingleCustomer = async (id) => {
        const url = `${process.env.React_App_Host}/singlecustomer/` + id;
        fetch(url).then(resp => resp.json())
            .then(resp => {
                if (resp.status === 200) {
                    // console.log(resp.response[0])
                    setName(resp.response[0].name);
                    setEmail(resp.response[0].email);
                    setPhone(resp.response[0].phone);
                    setAddress(resp.response[0].address);
                    setRoModel(resp.response[0].romodel);
                }
            }
            )
    }
 // get Ro Modl
 const getRoModul = async () => {
    const url = `${process.env.React_App_Host}/roModels`;
     await axios
      .get(url)
      .then((response) => setOptionModels(response.data.response))
      .catch((error) => console.log(error.message));

}
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
                                        <h5 className="m-b-10">Add Customer</h5>
                                        :
                                        <h5 className="m-b-10">Update Customer</h5>

                                }
                            </div>
                                {
                                    localStorage.getItem("access") ? 
                            <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/customers"}>Customers</NavLink></li>
                                    
                                {
                                    !id ?
                                        <li className="breadcrumb-item"><NavLink to={"#!"}>Add Customer</NavLink></li>
                                        :
                                        <li className="breadcrumb-item"><NavLink to={`#!`}>Update Customer</NavLink></li>

                                }
                            </ul>
                                    : 
                                    <ul className="breadcrumb">
<li className="breadcrumb-item"><NavLink to={"/"}><i className="feather icon-home"></i></NavLink></li>
<li className="breadcrumb-item"><NavLink to={"#!"}>Add Customer</NavLink></li>
                                        </ul>
                                }
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
                                    <h5>Add Customer</h5>
                                    :
                                    <h5>Edit Customer</h5>
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
                                                    <label htmlFor='roModel'>Ro Model</label>
                                                    <select className="form-control mt-2" id="roModel" name='roModel' onChange={(e) => setRoModel(e.target.value)} value={roModel}>
                                                   {!id ? <option hidden>Ro Model</option> : ''}
                                                    {optionModels.map((model, i) =>
                                                            <option key={i} value={model.model_name}>{model.model_name}</option>

                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label htmlFor='phone'>Phone No</label>
                                                    <input type="tel" className="form-control mt-2" name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Phone Number"/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor='email'>Email Address</label>
                                                    <input type="email" className="form-control mt-2" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address"/>
                                                </div>

                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-3">
                                                    <label htmlFor='address'>Address</label>
                                                    <textarea className="form-control mt-2" name='address' onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" rows="3"></textarea>
                                                </div>
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

export default EditCustomer
