import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../../images/avatar-1.jpg";
function Sidebar({ children }) {
  const [ismrOpen, setIsmrOpen] = useState(false);
  const mrtoggle = () => setIsmrOpen(!ismrOpen);

  const navigate = useNavigate();
  const handleLogout = () => {
    // console.log(localStorage.getItem("token"))
    fetch(`${process.env.React_App_Host}/logout`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title: "logout user" }),
    });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {/* header start */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 justify-content-between user-nav">
        <NavLink to={"/"} className="b-brand">
          <div className="b-bg">
            <i className="feather icon-trending-up"></i>
          </div>
          <span className="b-title">Kent</span>
        </NavLink>
        <div className="d-flex align-items-center justify-content-between">
            <NavLink to={"/add-customer"} className="btn btn-primary d-block" style={{marginRight: "15px", fontSize: "16px"}}><FaPlusCircle/> Add Customer</NavLink>
          <div
            className={`pl-3 dropdown drp-user ${ismrOpen ? "show" : ""}`}
          >
            <span
              className="dropdown-toggle"
              data-toggle="dropdown"
              onClick={mrtoggle}
            >
              <img
                className="rounded-circle m-r-10"
                style={{ width: "40px", marginTop: "-5px" }}
                src={user}
                alt="activity-user"
              />
            </span>
            <div
              className={`dropdown-menu dropdown-menu-right profile-notification ${
                ismrOpen ? "show" : ""
              }`}
            >
              <div className="pro-head">
                <img src={user} className="img-radius" alt="User-Profile" />
                <span>{localStorage.getItem("userName")}</span>
                <button
                  onClick={handleLogout}
                  className="dud-logout"
                  title="Logout"
                  style={{ background: "#00000000", border: "0" }}
                >
                  <i className="feather icon-log-out"></i>
                </button>
              </div>
              <ul className="pro-body">
                <li>
                  <NavLink to={"/profile"} className="dropdown-item">
                    <i className="feather icon-user"></i> Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* header end */}
      {/* content area start */}
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          <div className="pcoded-inner-content">{children}</div>
        </div>
      </div>
      {/* content area end */}
    </>
  );
}

export default Sidebar;
