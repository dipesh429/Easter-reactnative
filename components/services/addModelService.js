import axios from 'axios';

const apiEndpoint = 'http://batas.simriksacos.com.np/public/api/vehiclemodel';

export function AddModel(value) {
	return axios.post(`${apiEndpoint}`, value);
}

export function getModel() {
	return axios.get(`${apiEndpoint}`);
}

export function deleteModel(name) {
	return axios.delete(`${apiEndpoint}/${name}`);
}
