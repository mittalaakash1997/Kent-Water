import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const CustomerAdded = (props) => {
    const location = useLocation();
  return (
    <>
     <div className="main-body">
                <div className="page-wrapper">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Customer Details</h5>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label htmlFor='name'>Name</label>
                                                    <input type="text" className="form-control mt-2" name='name' value={location.state.name} readOnly/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor='roModel'>Ro Model</label>
                                                    <input type="text" className="form-control mt-2" name='name' value={location.state.roModel} readOnly/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label htmlFor='phone'>Phone No</label>
                                                    <input type="tel" className="form-control mt-2" name='phone' value={location.state.phone} readOnly/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor='email'>Email Address</label>
                                                    <input type="email" className="form-control mt-2" name='email' value={location.state.email} readOnly/>
                                                </div>

                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group mb-3">
                                                    <label htmlFor='address'>Address</label>
                                                    <textarea className="form-control mt-2" name='address' value={location.state.address} rows="3" readOnly></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <NavLink to={"/"} className="btn btn-success">Go to Map Listing</NavLink>
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

export default CustomerAdded
