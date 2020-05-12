import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.1.8:3000'
});

export default api;


//para fazer requisição GET: 
//const response = await api.get("/products");
