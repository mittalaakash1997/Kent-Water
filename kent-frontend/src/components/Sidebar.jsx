import React, { useState } from 'react';
import { FaTh, FaUserAlt, FaMapMarkedAlt, FaHouseUser, FaTint } from 'react-icons/fa';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import user from '../images/avatar-1.jpg';
function Sidebar({ children }) {
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [ismrOpen, setIsmrOpen] = useState(false);
    const mrtoggle = () => setIsmrOpen(!ismrOpen);
    const [ismOpen, setIsmOpen] = useState(false);
    const mtoggle = () => setIsmOpen(!ismOpen);
    const menuItem = [
        {
            path: "/admin",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/admin/users",
            name: "Users",
            icon: <FaUserAlt />
        },
        {
            path: "/admin/customers",
            name: "Customers",
            icon: <FaHouseUser />
        },
        {
            path: "/admin/ro-models",
            name: "Ro Models",
            icon: <FaTint />
        },
        {
            path: "/admin/map-marker",
            name: "Map Marker",
            icon: <FaMapMarkedAlt />
        }
    ]
    const navigate = useNavigate();
    const handleLogout = ()=> {
        // console.log(localStorage.getItem('token'))
       fetch(`${process.env.React_App_Host}/logout`, {
            method: "POST",
            headers: {
              'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({ title: 'logout user' })
            });
        localStorage.clear();
        navigate("/login");
       }
    return (
        <>

            {/* sidebar start */}
            <nav className={`pcoded-navbar ${isOpen ? "navbar-collapsed" : ""}${ismOpen ? "mob-open" : ""}`}>
                <div className="navbar-wrapper">
                    <div className="navbar-brand header-logo">
                        <NavLink to="/" className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up"></i>
                            </div>
                            <span className="b-title">Kent</span>
                        </NavLink>
                        <span className={`mobile-menu ${isOpen ? "on" : ""}`} id="mobile-collapse" onClick={toggle}><span></span></span>
                    </div>
                    <div className="navbar-content scroll-div">
                        <ul className="nav pcoded-inner-navbar">
                            {
                                menuItem.map((item, index) => (
                                    <li key={index} data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className={`nav-item`}>
                                        <NavLink to={item.path} className={`nav-link ${location.pathname === item.path ? "active" : ""}`}>
                                            <span className="pcoded-micon">{item.icon}</span>
                                            <span className="pcoded-mtext">{item.name}</span>
                                        </NavLink>
                                    </li>

                                ))
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            {/* sidebar end */}

            {/* header start */}
            <header className="navbar pcoded-header navbar-expand-lg navbar-light">
        <div className="m-header">
            <a className="mobile-menu" onClick={mtoggle} id="mobile-collapse1" href="#!"><span></span></a>
            <NavLink to={"/"} className="b-brand">
                   <div className="b-bg">
                       <i className="feather icon-trending-up"></i>
                   </div>
                   <span className="b-title">Kent</span>
               </NavLink>
        </div>
        <a className="mobile-menu" id="mobile-header" href="#!">
            <i className="feather icon-more-horizontal"></i>
        </a>
        <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav ml-auto">
                
                <li>
                    <div className={`dropdown drp-user ${ismrOpen ? "show" : ""}`}>
                        <span className="dropdown-toggle" data-toggle="dropdown" onClick={mrtoggle}>
                        <img className="rounded-circle m-r-10" style={{ width: "40px" }} src={user} alt="activity-user"/>
                        </span>
                        <div className={`dropdown-menu dropdown-menu-right profile-notification ${ismrOpen ? "show" : ""}`}>
                            <div className="pro-head">
                                <img src={user} className="img-radius" alt="User-Profile"/>
                                <span>{localStorage.getItem("userName")}</span>
                                <button onClick={handleLogout} className="dud-logout" title="Logout" style={{background: "#00000000", border: "0"}}>
                                    <i className="feather icon-log-out"></i>
                                </button>
                            </div>
                            <ul className="pro-body">
                                <li><NavLink to={"/admin/profile"} className="dropdown-item"><i className="feather icon-user"></i> Profile</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </header>
            {/* header end */}
            {/* content area start */}
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {/* content area end */}

        </>
    )
}

export default Sidebar
