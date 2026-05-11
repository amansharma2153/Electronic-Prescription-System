// import axios from 'axios'

// const API_URL = import.meta.env.VITE_API_URL

// const axiosInstance = axios.create({
//   baseURL: API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // 🔐 Add token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // ❌ Handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("❌ AXIOS ERROR:", error.response?.data || error.message)

//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//       window.location.href = '/'
//     }

//     return Promise.reject(error)
//   }
// )

// export default axiosInstance


import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ✅ prevent hanging requests
});

// 🔐 REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🔍 Debug (very useful)
    console.log("➡️ API Request:", config.method, config.url);

    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ AXIOS ERROR:",
      error.response?.data || error.message
    );

    // 🔐 Handle unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // ✅ Better than hard reload
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;