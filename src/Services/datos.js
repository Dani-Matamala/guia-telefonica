import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/persons';

const getPersons = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
}
const getPerson = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}
const createPerson = (person) => {
    return axios.post(baseUrl, person);
}
const updatePerson = async (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person);
    const response = await request;
    return response.data;
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
}

export default {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}