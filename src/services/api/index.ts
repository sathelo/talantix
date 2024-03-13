import axios from "axios";

const $http = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export default $http;
