import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'admin-on-rest';
import { login, logout } from './actions/authActions';

export default (type, params) => {
	switch(type) {
		case AUTH_LOGIN:
			return login(params);
		case AUTH_LOGOUT:
			return logout();
		case AUTH_CHECK:
			return (localStorage.getItem('username') && localStorage.getItem('token')) ? Promise.resolve() : Promise.reject();
		default:
			return Promise.reject('Unkown method');
	}
};
