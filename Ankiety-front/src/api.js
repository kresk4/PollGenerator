import axios from 'axios';

const {API_URL} = require('./config/main');

const http = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

class Api {
    loginUser(login, password) {
        return http.post('/users/login', {login, password})
    }

    registerUser(login, password) {
        return http.post('/users', {login, password})
    }

    getUserSurvey() {
        return http.get('/survey')
    }

    logOutUser() {
        return http.delete('/users/logout')
    }

    getUserDetails() {
        return http.get('users/details').then(({data}) => data.details);
    }
}

export default new Api();