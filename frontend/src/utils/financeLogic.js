export const saveFinancialRecord = async (income, housingType, housingPayment) => {
    // Aplicamos la fórmula que definimos
    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;

    const { data, error } = await supabase
        .from('financial_records')
        .insert([
            { 
                net_income: income, 
                housing_type: housingType, 
                housing_payment: housingPayment,
                needs_budget: needs,
                wants_budget: wants,
                savings_budget: savings,
                user_id: 'ID_DE_TU_USUARIO' // Por ahora puedes usar un ID fijo
            }
        ]);

    if (error) console.error('Error guardando:', error);
    return data;
}