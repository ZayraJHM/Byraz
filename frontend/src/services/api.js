import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const sendFinancialData = async (data) => {
    try {
        // Agregamos el /api antes de /calculate
        const response = await api.post('/api/calculate', data); 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Error de red");
    }
};