import { ApiConfig } from "../apiConfig/ApiConfig";
import { ConsoleLogs } from "../../utils/ConsoleLogs";
import { ApiCallPost } from "../apiConfig/ApiCall";
import { ApiCallGET } from "../apiConfig/ApiCall";

const TAG = "AuthService";

const AuthService = {
  login: async (email, password) => {
    const { baseUrl, login } = ApiConfig;

    const url = baseUrl + login;

    const params = {
      emailId: email,
      password: password,
    };

    ConsoleLogs(TAG + ", login", `url : + ${url}`);
    ConsoleLogs(
      TAG + ", login",
      `loginRequestParams : '+ ${JSON.stringify(params)}'`
    );

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },

  getTransactions: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, userTransactions } = ApiConfig;

    const url = baseUrl + userTransactions;

    const params = {};

    ConsoleLogs(TAG + ", getTransactions", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGET(url, params, headers);
  },

  getActionTrans: async (id, status, refid) => {
    const token = localStorage.getItem("token");
    const { baseUrl, getActionTrans } = ApiConfig;

    const url = baseUrl + getActionTrans;

    const params = {
      tid: id,
      st: status,
      tref: refid,
    };

    ConsoleLogs(TAG + ", getActionTrans", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getCheckSelect: async (chId, refId) => {
    const token = localStorage.getItem("token");
    const { baseUrl, getCheckSelect } = ApiConfig;

    const url = baseUrl + getCheckSelect;

    const params = {
      tids: chId,
      tref: refId,
    };

    ConsoleLogs(TAG + ", getCheckSelect", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getUserBal: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, getUserBal } = ApiConfig;

    const url = baseUrl + getUserBal;

    const params = {};

    ConsoleLogs(TAG + ", getUserBal", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  addUserBalance: async (amount) => {
    const token = localStorage.getItem("token");
    const { baseUrl, addUserBalance } = ApiConfig;

    const url = baseUrl + addUserBalance;

    const params = {
      bal: amount,
    };

    ConsoleLogs(TAG + ", addUserBalance", `url : ' + ${url}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },
};

export default AuthService;
