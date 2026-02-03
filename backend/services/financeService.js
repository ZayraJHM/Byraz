import { db } from '../config/database.js';

/**
 * Calcula y guarda el registro financiero basado en el perfil de vivienda.
 */
export const createFinancialRecord = async (userId, income, housingType, housingPayment) => {
    
    // 1. Definimos los porcentajes según la lógica que acordamos para México
    let needsPercent, wantsPercent, savingsPercent;

    switch (housingType) {
        case 'mortgage':
            needsPercent = 0.55; // Se permite un poco más por ser inversión patrimonial
            wantsPercent = 0.25;
            savingsPercent = 0.20;
            break;
        case 'owned':
            needsPercent = 0.30; // Gastos mínimos (predial, mantenimiento)
            wantsPercent = 0.35; // Mayor libertad de gasto
            savingsPercent = 0.35; // Mayor capacidad de inversión
            break;
        case 'rent':
        default:
            needsPercent = 0.50; // Regla estándar 50/30/20
            wantsPercent = 0.30;
            savingsPercent = 0.20;
            break;
    }

    // Cálculo con redondeo a 2 decimales
    const needsBudget = Math.round((income * needsPercent) * 100) / 100;
    const wantsBudget = Math.round((income * wantsPercent) * 100) / 100;
    const savingsBudget = Math.round((income * savingsPercent) * 100) / 100;

    // 3. Guardamos usando nuestra conexión 'db'
    const { data, error } = await db
        .from('financial_records')
        .insert([
            {
                user_id: userId,
                net_income: income,
                housing_type: housingType,
                housing_payment: housingPayment,
                needs_budget: needsBudget,
                wants_budget: wantsBudget,
                savings_budget: savingsBudget
            }
        ])
        .select(); // El .select() nos devuelve el registro creado

    if (error) {
        throw new Error(`Error al guardar en la DB: ${error.message}`);
    }

    return data[0];
};