import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createFinancialRecord } from './services/financeService.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
    origin: 'https://byraz-99dkmqttd-zayrajhms-projects.vercel.app' 
  }));
// Middleware para que Express entienda datos en formato JSON
app.use(express.json());

// RUTA: Aquí es donde el frontend enviará los datos
app.post('/api/calculate', async (req, res) => {
    try {
        const { userId, income, housingType, housingPayment } = req.body;

        if (!userId || !income || !housingType) {
            return res.status(400).json({ 
                error: "Faltan campos obligatorios: userId, income y housingType son requeridos." 
            });
        }

        if (typeof income !== 'number' || income <= 0) {
            return res.status(400).json({ 
                error: "El ingreso neto debe ser un número mayor a cero." 
            });
        }

        const validHousingTypes = ['rent', 'mortgage', 'owned'];
        if (!validHousingTypes.includes(housingType)) {
            return res.status(400).json({ 
                error: "Tipo de vivienda inválido. Use: rent, mortgage o owned." 
            });
        }

        // Llamamos a tu servicio estrella
        const record = await createFinancialRecord(userId, income, housingType, housingPayment);

        // Respondemos al cliente con éxito
        res.status(201).json({
            message: "Cálculo realizado y guardado",
            data: record
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Byraz corriendo en http://localhost:${PORT}`);
});