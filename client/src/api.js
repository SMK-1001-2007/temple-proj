// import axios from "axios";

// // Helper function which creates an axios instance so that we don't need to rewrite this 
// // piece of code whenever we need to send a request
// const instance = axios.create({
//   baseURL: "http://localhost:5000", // change if needed
//   withCredentials: true // if using cookies
// });

// // Attach JWT from localStorage if applicable
// // Config is the internal axios object that holds all the request related details
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// API 
// export const register = async (data) => {
//   instance.post("/api/auth/register", data);
// }

// export const login = async (data) => {
//   try {
//     const res = await instance.post("/api/auth/login", data);
//     console.log(res);
//     localStorage.setItem("token", res.data.token);
//     console.log("Login successful!");
//   }
//   catch(error) {
//     console.log(error);
//   }
// }

// export const getUserInfo = async () => {
//   return instance.get("/api/user/profile");
// }