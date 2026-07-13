import axios from 'axios';

const baseUrl = axios.create({ 
  baseURL: "https://nodejs-ecommerce-api-v1-production-a56b.up.railway.app/api/v1"
});

export default baseUrl;