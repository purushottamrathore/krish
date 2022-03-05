import React from "react";

const Header = () => {
    return (
        <>
        <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">

            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i data-feather="menu"></i></button>

            <a className="navbar-brand pe-3 ps-4 ps-lg-3" href="/dashboard">
                <img src="assets/img/logo_footer.png" className="img-fluid" />
            </a>


            <ul className="navbar-nav align-items-center ms-auto">



                <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="bell"></i></a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                        <h6 className="dropdown-header dropdown-notifications-header">
                            <i className="me-2" data-feather="bell"></i>
                            Alerts Center
                        </h6>
                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-info"><i data-feather="bar-chart"></i></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 22, 2021</div>
                                <div className="dropdown-notifications-item-content-text">A new monthly report is ready. Click here to view!</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-danger"><i className="fas fa-exclamation-triangle"></i></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 8, 2021</div>
                                <div className="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-success"><i data-feather="user-plus"></i></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 2, 2021</div>
                                <div className="dropdown-notifications-item-content-text">New user request. Woody has requested access to the organization.</div>
                            </div>
                        </a>
                        {/*  <!-- <a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a> --> */}
                    </div>
                </li>

                <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid" src="assets/img/illustrations/profiles/profile-1.png" /></a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img className="dropdown-user-img" src="assets/img/illustrations/profiles/profile-1.png" />
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">Valerie Luna</div>
                                <div className="dropdown-user-details-email"><a href="#" className="__cf_email__" >admin@bloomex.oi</a></div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        {/* <a className="dropdown-item" href="genral_settings.php">
                            <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Genral Settings
                        </a> */}
                        <a className="dropdown-item" href="/">
                            <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
        </>
    )
}
export default Header;