import axios from 'axios';
import config from '../../config';
const instance = axios.create({
	baseURL: config.API_Config.BackEnd_BaseURL,
	headers: {
		'Content-Type': 'application/json'
	}
});
instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	res => {
		return res;
	},
	async err => {
		return Promise.reject(err);
	}
);

export default instance;
