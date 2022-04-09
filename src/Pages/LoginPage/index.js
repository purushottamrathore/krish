import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/services/AuthService";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";
import {
  alertErrorMessage,
  alertSuccessMessage,
} from "../../customComponent/CustomAlertMessage";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  const handleLogin = async (email, password) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.login(email, password).then(async (result) => {
      if (result.status) {
        try {
          LoaderHelper.loaderStatus(false);
          localStorage.setItem("token", result.token);
          localStorage.setItem("name", result.firstName);
          localStorage.setItem("email", result.emailId);
          alertSuccessMessage("Login Success");
          navigate("/transaction");
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          console.log(error, "error");
        }
      } else {
        LoaderHelper.loaderStatus(false);
        // const errorMessage = result.message;
        alertErrorMessage("Login Failed!!");
      }
    });
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                <div className="card my-5">
                  <div className="card-body p-5 text-center">
                    <h2>Admin Panel</h2>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body p-5">
                    <form>
                      <div className="mb-3">
                        <label
                          className="text-gray-600 small"
                          for="emailExample"
                        >
                          Email address
                        </label>
                        <input
                          className="form-control form-control-solid"
                          type="email"
                          name="email"
                          placeholder=""
                          aria-label="Email Address"
                          aria-describedby="emailExample"
                          value={email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          className="text-gray-600 small"
                          for="passwordExample"
                        >
                          Password
                        </label>
                        <input
                          className="form-control form-control-solid"
                          type="password"
                          placeholder=""
                          aria-label="Password"
                          name="password"
                          aria-describedby="passwordExample"
                          value={password}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* <div className="mb-3"><a className="small" href="/forgotpassword">Forgot your password?</a></div> */}

                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            id="checkRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            for="checkRememberPassword"
                          >
                            Remember password
                          </label>
                        </div>
                        <button
                          onClick={() => handleLogin(email, password)}
                          className="btn btn-primary"
                          type="button"
                        >
                          {" "}
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
