import React, { useState, useEffect } from "react";
import AuthService from "../../api/services/AuthService";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";
import {
  alertErrorMessage,
  alertSuccessMessage,
} from "../../customComponent/CustomAlertMessage";

const Header = () => {
  const emailId = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const uType = localStorage.getItem("uType");
  const [userBal, setUserBal] = useState("");
  const [amount, setAmount] = useState("");

  const handleUserBal = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getUserBal().then(async (result) => {
      if (result.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setUserBal(result.balance);
          //alertSuccessMessage(result.message);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          console.log(error, "error");
        }
      } else {
        LoaderHelper.loaderStatus(false);
        // const errorMessage = result.message;
        alertErrorMessage(result.message);
      }
    });
  };

  useEffect(() => {
    handleUserBal();
  }, []);
  const handleAddUserBalance = async (amount) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.addUserBalance(amount).then(async (result) => {
      if (result.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setAmount("");
          handleUserBal();
          alertSuccessMessage(result.message);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          console.log(error, "error");
        }
      } else {
        LoaderHelper.loaderStatus(false);
        // const errorMessage = result.message;
        alertErrorMessage(result.message);
      }
    });
  };
  return (
    <>
      <nav
        className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
        id="sidenavAccordion"
      >
        {/* <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i data-feather="menu"></i></button> */}

        {/* <img src="assets/img/logo_footer.png" className="img-fluid" /> */}
        <h3 style={{ marginLeft: "70px" }}>Balance :- {userBal}</h3>

        {uType == 1 ? (
          <div className="row" style={{ marginLeft: "800px" }}>
            <button
              class="btn btn-indigo   btn-block w-100"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addAmount"
            >
              Add Balance
            </button>
          </div>
        ) : undefined}

        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
            <a
              className="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownAlerts"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i data-feather="bell"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
              aria-labelledby="navbarDropdownAlerts"
            >
              <h6 className="dropdown-header dropdown-notifications-header">
                <i className="me-2" data-feather="bell"></i>
                Alerts Center
              </h6>
              <a
                className="dropdown-item dropdown-notifications-item"
                href="#!"
              >
                <div className="dropdown-notifications-item-icon bg-info">
                  <i data-feather="bar-chart"></i>
                </div>
                <div className="dropdown-notifications-item-content">
                  <div className="dropdown-notifications-item-content-details">
                    December 22, 2021
                  </div>
                  <div className="dropdown-notifications-item-content-text">
                    A new monthly report is ready. Click here to view!
                  </div>
                </div>
              </a>

              <a
                className="dropdown-item dropdown-notifications-item"
                href="#!"
              >
                <div className="dropdown-notifications-item-icon bg-danger">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="dropdown-notifications-item-content">
                  <div className="dropdown-notifications-item-content-details">
                    December 8, 2021
                  </div>
                  <div className="dropdown-notifications-item-content-text">
                    Critical system failure, systems shutting down.
                  </div>
                </div>
              </a>

              <a
                className="dropdown-item dropdown-notifications-item"
                href="#!"
              >
                <div className="dropdown-notifications-item-icon bg-success">
                  <i data-feather="user-plus"></i>
                </div>
                <div className="dropdown-notifications-item-content">
                  <div className="dropdown-notifications-item-content-details">
                    December 2, 2021
                  </div>
                  <div className="dropdown-notifications-item-content-text">
                    New user request. Woody has requested access to the
                    organization.
                  </div>
                </div>
              </a>
              {/*  <!-- <a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a> --> */}
            </div>
          </li>

          <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a
              className="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownUserImage"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="img-fluid"
                src="assets/img/illustrations/profiles/profile-1.png"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
              aria-labelledby="navbarDropdownUserImage"
            >
              <h6 className="dropdown-header d-flex align-items-center">
                <img
                  className="dropdown-user-img"
                  src="assets/img/illustrations/profiles/profile-1.png"
                />
                <div className="dropdown-user-details">
                  <div className="dropdown-user-details-name">{name}</div>
                  <div className="dropdown-user-details-email">
                    <a href="#" className="__cf_email__">
                      {emailId}
                    </a>
                  </div>
                </div>
              </h6>
              <div className="dropdown-divider"></div>
              {/* <a className="dropdown-item" href="genral_settings.php">
                            <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Genral Settings
                        </a> */}
              <a className="dropdown-item" href="/">
                <div className="dropdown-item-icon">
                  <i data-feather="log-out"></i>
                </div>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div
        class="modal fade"
        id="addAmount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Enter Amount
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                name="amount"
                placeholder="Enter Amount Here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleAddUserBalance(amount)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
