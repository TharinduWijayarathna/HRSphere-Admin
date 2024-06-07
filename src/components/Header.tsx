import { IconBell, IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const user = localStorage.getItem('user');
    const userName = user ? user.split(' ')[0] : '';
    

    return (
        <>
            <header className="navbar navbar-expand-md d-print-none">
                <div className="container-xl">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-menu"
                        aria-controls="navbar-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <a href=".">
                            <img
                                src="./assets/static/logo.png"
                                width={110}
                                height={32}
                                alt="Tabler"
                                className="navbar-brand-image"
                            />
                        </a>
                    </h1>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="d-none d-md-flex">
                            <a
                                href="?theme=dark"
                                className="nav-link px-0 hide-theme-dark"
                                title="Enable dark mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <IconSun stroke={1.5} />
                            </a>
                            <a
                                href="?theme=light"
                                className="nav-link px-0 hide-theme-light"
                                title="Enable light mode"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                            >
                                <IconMoon stroke={1.5} />
                            </a>
                            <div className="nav-item dropdown d-none d-md-flex me-3">
                                <Link to="#" className="nav-link px-0" data-bs-toggle="dropdown">

                                    <IconBell stroke={1.5} />
                                    <span className="badge bg-red" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Last updates</h3>
                                        </div>
                                        <div className="list-group list-group-flush list-group-hoverable">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="status-dot status-dot-animated bg-red d-block" />
                                                    </div>
                                                    <div className="col text-truncate">
                                                        <Link to="#" className="text-body d-block">
                                                            Example 1
                                                        </Link>
                                                        <div className="d-block text-muted text-truncate mt-n1">
                                                            Change deprecated html tags to text decoration
                                                            classes (#29604)
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to="#" className="list-group-item-actions">
                                                            {/* Download SVG icon from http://tabler-icons.io/i/star */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="icon text-muted"
                                                                width={24}
                                                                height={24}
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={2}
                                                                stroke="currentColor"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path
                                                                    stroke="none"
                                                                    d="M0 0h24v24H0z"
                                                                    fill="none"
                                                                />
                                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <Link to="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown">
                                <span
                                    className="avatar avatar-sm"
                                    style={{
                                        backgroundImage: "url(./assets/static/avatars/000m.jpg)",
                                    }}
                                />
                                <div className="d-none d-xl-block ps-2 text-start">
                                    <div>
                                        {userName}
                                    </div>
                                    <div className="mt-1 small text-muted">
                                        System User
                                    </div>
                                </div>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="./profile.html" className="dropdown-item">
                                    Profile
                                </a>
                                <a href="./settings.html" className="dropdown-item">
                                    Settings
                                </a>
                                <button onClick={logout} className="dropdown-item">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );

}

export default Header;