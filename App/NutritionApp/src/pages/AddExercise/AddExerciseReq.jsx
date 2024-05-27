
import axios from 'axios';
import config from '../../../config';
export const AddExerciseReq = async (name) => {
    try {
        const response = await axios.get(config.BASE_URL + '/exercise/search', {
            params: { exercisename: name }
        });
        // console.log(response.data)
        return response.data;
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
