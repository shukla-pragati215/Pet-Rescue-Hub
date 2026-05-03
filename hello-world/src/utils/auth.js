// src/utils/auth.js
export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};
