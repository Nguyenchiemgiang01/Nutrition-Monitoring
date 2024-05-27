
import axios from 'axios';
import config from '../../../config';

export const signUp = async (userData) => {
    try {
        const response = await axios.post(config.BASE_URL + '/signup', userData);
        if (response.status == 200) {
            return response.data.success;
        }
        else {
            console.log(response)
        }
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};
