import axios from 'axios';

const BASE_URL = import.meta.env.VITE_RECRUITLY_BASE_URL;
const API_KEY = import.meta.env.VITE_RECRUITLY_API_KEY;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: API_KEY,
  },
});
