
import axios from 'axios';

// jest.mock('axios');
jest.mock('commons/helpers/request', () => ({
    method: {
        get: () => 'GET',
        post: () => 'POST',
        put: () => 'PUT',
        delete: () => 'DELETE',
    },
}));

const request = (config) => {
    // console.log('request config __mocks__', config);
    const { method, ...rest } = config;
    // return new Promise((resolve) => {
    //     resolve(10);
    // });
    if (method === 'GET') {
        return axios.get({ ...rest });
    }

    if (method === 'POST') {
        return axios.post({ ...rest });
    }

    return new Error('request mock error');
};

export default request;
