import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/tasks', // to connect with bakcend
});

export const getAllTasks = () => api.get('/');
export const getTaskById = (id) => api.get(`/${id}`);
export const createTask = (taskData) => api.post('/', taskData);
export const updateTask = (id, taskData) => api.put(`/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/${id}`);

const apis = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};

export default apis;
