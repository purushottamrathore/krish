import { ApiConfig } from "../apiConfig/ApiConfig";
import { ConsoleLogs } from "../../utils/ConsoleLogs";
import { ApiCallPost } from "../apiConfig/ApiCall";

const TAG = 'AuthService';

const AuthService = {
    login: async (email, password) => {
        const { baseUrl, login } = ApiConfig;

        const url = baseUrl + login;

        const params = {
            email: email,
            password: password,
        };

        ConsoleLogs(TAG + ', login', `url : + ${url}`);
        ConsoleLogs(
            TAG + ', login', `loginRequestParams : '+ ${JSON.stringify(params)}'`,
        );

        const headers = {
            'Content-Type': 'application/json',
        };

        return ApiCallPost(url, params, headers);

    },
    getTransactions: async () => {
    const token = localStorage.getItem("token");
    const { baseTrans, userTransactions } = ApiConfig;

    const url = baseTrans + userTransactions;

    const params = {};

    ConsoleLogs(TAG + ', getTransactions', `url : ' + ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return ApiCallPost(url, params, headers);
  },

};

export default AuthService;