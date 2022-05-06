import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const predict_image = (formData) => API.post(`/urlRoute`, formData);

export const predict_file = (fromData) => API.post(`/fileRoute`, fromData);

export const fetch_labels = (style) => API.get(`/fetchLabels?labelsType=${style}`)

export const ping_server = () => API.get(`/ping`)