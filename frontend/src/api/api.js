import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const submitReport = (data) => api.post('/report', data);
export const uploadCSV = (formData) => api.post('/reports/upload', formData);
export const getJobStatus = (jobId) => api.get(`/job-status/${jobId}`);
export const getDashboard = (month) => api.get(`/dashboard?month=${month}`);
