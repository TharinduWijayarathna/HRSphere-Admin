import React, { Fragment } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { IconLayoutDashboard, IconSettings, IconUsersGroup } from "@tabler/icons-react";

const Navbar = () => {
    return (
        <>
            {/* Navbar */}
            <Header />
            <header className="navbar-expand-md">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="navbar">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                                <li className={`nav-item` + (window.location.pathname === "/" ? " active" : "")}>
                                    <Link to="/" className="nav-link">
                                        <IconLayoutDashboard stroke={1.5} />
                                        <span className="nav-link-title">&nbsp;Dashboard</span>
                                    </Link>
                                </li>

                                <li className={`nav-item` + (window.location.pathname === "/tenants" ? " active" : "")}>
                                    <Link to="/tenants" className="nav-link">
                                        <IconUsersGroup stroke={1.5} />
                                        <span className="nav-link-title">&nbsp;Tenants</span>
                                    </Link>
                                </li>


                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#navbar-help"
                                        data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside"
                                        role="button"
                                        aria-expanded="false"
                                    >
                                        <IconSettings stroke={1.5} />
                                        <span className="nav-link-title">&nbsp;Settings</span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link to="/users" className="dropdown-item">
                                            User Management
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
