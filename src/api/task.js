import axios from "axios";

var url = "http://localhost:3001/tasks";

export const getTasks = () => {
  return axios.get(`${url}`);
};

export const addTask = (task) => {
  return axios.post(`${url}`, task);
};

export const updateTask = (id, task) => {
  return axios.put(`${url}/${id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${url}/${id}`);
};
