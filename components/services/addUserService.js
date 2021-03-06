import axios from 'axios';
import { bURL } from '../app-config';


const apiEndpoint = `${bURL}api/user`;

export function AddUser(value, isEdit) {
	if (isEdit) {
		return axios.put(`${apiEndpoint}/${value.id}`, value);
	}
	return axios.post(`${apiEndpoint}`, value);
}

export function getUser() {
	return axios.get(`${apiEndpoint}`);
}

export function deleteUser(id) {
	return axios.delete(`${apiEndpoint}/${id}`);
}
