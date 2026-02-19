import axios from 'axios';

const api = axios.create({
    baseURL: 'https://byraz.onrender.com/api'
});

export const sendFinancialData = async (data) => {
    try {
        const response = await api.post('/calculate', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Error de red");
    }
};