const BASE_URL = "http://localhost:5000/api";

// Register User
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration Failed");
  }

  return await response.json();
};

// Get All Roles
export const getRoles = async () => {
  const response = await fetch(`${BASE_URL}/role`);

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  return await response.json();
};


// Login User
export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login Failed");
  }

  return await response.json();
};