import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ()=> {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');      
    }
}, [navigate]);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.React_App_Host}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      if (json.isadmin === 1) {
        //save auth token and redirect
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("userName", json.userName);
        localStorage.setItem("access", json.isadmin);
        toast.success("Welcome " + credentials.email);
        navigate("/admin");
      } else if (json.isadmin === 0) {
        //save auth token and redirect
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("userName", json.userName);
        toast.success("Welcome " + credentials.email);
        navigate("/");
      }
    } else {
      toast.error(json.error);
    }
    // console.log(json)
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r"></span>
            <span className="r s"></span>
            <span className="r s"></span>
            <span className="r"></span>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon"></i>
              </div>
              <h3 className="mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    value={credentials.email}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={credentials.password}
                    name="password"
                    placeholder="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary shadow-2 mb-4">
                  Login
                </button>
              </form>
              <p className="mb-2 text-muted">
                Forgot password? <a href="#!">Reset</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
