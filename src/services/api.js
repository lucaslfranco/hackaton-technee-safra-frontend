import axios from 'axios';
import { config } from '../config';

const api = axios.create({
    baseURL: `${config.REACT_APP_API_URL}`,
    // withCredentials: true
});

export default api;