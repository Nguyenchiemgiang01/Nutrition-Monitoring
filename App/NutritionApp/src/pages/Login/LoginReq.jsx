
import axios from 'axios';
import config from '../../../config';
export const loginRequest = async (email, password) => {
    try {
        const response = await axios.post(config.BASE_URL + '/login', {
            email,
            password,
        });

        return response;
    } catch (error) {
        if (error.response) {

            throw new Error(error.response.data.error || error.response.data.message);
        } else if (error.request) {

            throw new Error('Network error');
        } else {

            throw new Error(error.message);
        }
    }
};
