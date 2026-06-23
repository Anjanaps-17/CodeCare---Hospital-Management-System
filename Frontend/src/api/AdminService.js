import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// USERS

export const getUsers = async () => {
  const response = await axios.get(
    `${API_URL}/users`,
    getAuthHeader()
  );

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(
    `${API_URL}/users/${id}`,
    getAuthHeader()
  );

  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/users`,
    userData,
    getAuthHeader()
  );

  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(
    `${API_URL}/users/${id}`,
    userData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/users/${id}`,
    getAuthHeader()
  );

  return response.data;
};

// DOCTORS

export const getDoctors = async () => {
  const response = await axios.get(
    `${API_URL}/doctors`,
    getAuthHeader()
  );

  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axios.get(
    `${API_URL}/doctors/${id}`,
    getAuthHeader()
  );

  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await axios.post(
    `${API_URL}/doctors`,
    doctorData,
    getAuthHeader()
  );

  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await axios.put(
    `${API_URL}/doctors/${id}`,
    doctorData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await axios.delete(
    `${API_URL}/doctors/${id}`,
    getAuthHeader()
  );

  return response.data;
};

// DEPARTMENTS

export const getDepartments = async () => {
  const response = await axios.get(
    `${API_URL}/departments`,
    getAuthHeader()
  );

  return response.data;
};

export const getDepartmentById = async (id) => {
  const response = await axios.get(
    `${API_URL}/departments/${id}`,
    getAuthHeader()
  );

  return response.data;
};

export const createDepartment = async (departmentData) => {
  const response = await axios.post(
    `${API_URL}/departments`,
    departmentData,
    getAuthHeader()
  );

  return response.data;
};

export const updateDepartment = async (
  id,
  departmentData
) => {
  const response = await axios.put(
    `${API_URL}/departments/${id}`,
    departmentData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await axios.delete(
    `${API_URL}/departments/${id}`,
    getAuthHeader()
  );

  return response.data;
};

