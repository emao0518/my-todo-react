import axios from "axios";

var url = "http://localhost:3001";

export const getTasks = () => {
  return axios.get(`${url}/tasks`);
};

export const addTask = (task) => {
  return axios.post(`${url}/tasks`, task);
};

export const updateTask = (id, task) => {
  return axios.put(`${url}/tasks/${id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${url}/tasks/${id}`);
};
