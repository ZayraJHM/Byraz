import { createFinancialRecord } from './services/financeService.js';

async function runTest() {
    try {
        console.log("🚀 Iniciando cálculo financiero...");

        // Simulamos datos que vendrían de un formulario
        const fakeUserId = '00000000-0000-0000-0000-000000000000'; // ID temporal
        const salary = 25000;
        const houseType = 'rent'; 
        const payment = 7000;

        const result = await createFinancialRecord(fakeUserId, salary, houseType, payment);

        console.log("✅ ¡Registro guardado con éxito!");
        console.table({
            Ingreso: result.net_income,
            Vivienda: result.housing_type,
            Básicos_50: result.needs_budget,
            Deseos_30: result.wants_budget,
            Ahorro_20: result.savings_budget
        });

    } catch (error) {
        console.error("❌ Error en la operación:", error.message);
    }
}

runTest();