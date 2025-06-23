// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://leoproti.com.br:8004'
});

export default api;
