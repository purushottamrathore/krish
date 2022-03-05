import axios from 'axios';
import { ConsoleLogs } from '../../utils/ConsoleLogs';

const TAG = 'ApiCall';

export const ApiCallPost = async (url, parameters, headers) => {
    try {
        const response = await axios.post(url, parameters, { headers: headers });
        ConsoleLogs(
            TAG + ', ApiCallPost',
            `apiDebug, response: ${JSON.stringify(response.data)}`,
        );
        return response.data;
    } catch (error) {
        ConsoleLogs(
            TAG + ',ApiCallPost',
            `apiDebug, response error: ${JSON.stringify(error.response.data.message)}`,
        );
        return error.response.data;
    }

};