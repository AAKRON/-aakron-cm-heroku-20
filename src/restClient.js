import { jsonServerRestClient } from 'admin-on-rest';
import { SERVER_URL } from './config';
import { setAuthorizationToken } from './actions/authActions';

const restClient = jsonServerRestClient(SERVER_URL, setAuthorizationToken);
export default (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 500));
