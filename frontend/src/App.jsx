import { useState } from 'react'
import { sendFinancialData } from './services/api'
import './App.css'

function App() {
  // 1. Definimos el estado para los campos del formulario
  const [formData, setFormData] = useState({
    income: '',
    housingType: 'rent',
    housingPayment: '',
    userId: '9f7e5603-42bc-4f07-989f-8f0e8a9d9fcb' // Pega aquí el UUID que usamos en Thunder Client
  })

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [incomeError, setIncomeError] = useState("");
  const [housingPaymentError, setHousingPaymentError] = useState("");
  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Si el usuario está escribiendo en el campo de ingreso
    if (name === 'income') {
      const numValue = parseFloat(value);
      if (numValue <= 0) {
        setIncomeError("El ingreso neto debe ser un número mayor a cero.");
      } else {
        setIncomeError(""); // Limpiamos el error si el número es válido
      }
    }

    // Si el usuario está escribiendo en el campo de pago de vivienda
    if (name === 'housingPayment') {
      const numValue = parseFloat(value);
      if (numValue <= 0) {
        setHousingPaymentError("El pago de vivienda debe ser un número mayor a cero.");
      } else {
        setHousingPaymentError(""); // Limpiamos el error si el número es válido
      }
    }
  };

  // 3. Función para enviar los datos al Backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      // Convertimos a número antes de enviar
      const dataToSend = {
        ...formData,
        income: parseFloat(formData.income),
        housingPayment: parseFloat(formData.housingPayment) || 0
      }
      
      const response = await sendFinancialData(dataToSend)
      setResult(response.data)
    } catch (err) {
      setError(err.error || "Ocurrió un error inesperado")
    }
  }

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });

  return (
    <div className="main-wrapper">
      {/* Encabezado Verde */}
      <header className="header-byraz">
        <h1> Byraz</h1>
      </header>
  
      <div className="content-container">
        {/* Explicación de la fórmula */}
        <section className="formula-intro">
          <p className="formula-title">La Fórmula: 50/30/20</p>
          <p>Esta regla divide tus ingresos mensuales netos en tres categorías:</p>
          <ul>
            <li><strong>50% para Gastos Básicos (Necesidades):</strong> Renta o hipoteca, servicios, transporte y alimentos.</li>
            <li><strong>30% para Gastos Personales (Deseos):</strong> Salidas, streaming, hobbies.</li>
            <li><strong>20% para Ahorro o Deuda:</strong> Fondo de emergencia, AFORE o pago de tarjetas.</li>
          </ul>
        </section>
  
        <div className="main-grid">
          {/* LADO IZQUIERDO: Formulario */}
          <form onSubmit={handleSubmit} className="input-section">
            <div className="form-group">
              <label className="form-label">Ingreso mensual neto</label>
              <input 
                type="number" 
                name="income" 
                className={incomeError ? 'input-error' : ''}
                value={formData.income} 
                onChange={handleChange} 
                placeholder="Ej: 15247.61"
              />
              {/* Mensaje de error dinámico */}
              {incomeError && <span className="error-text-small">{incomeError}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">Tipo de vivienda</label>
              <select name="housingType" value={formData.housingType} onChange={handleChange}>
                <option value="rent">Renta</option>
                <option value="mortgage">Hipoteca</option>
                <option value="owned">Propia</option>
              </select>
            </div>
  
            <div className="form-group">
              <label className="form-label">Pago de vivienda</label>
              <input 
                type="number" 
                name="housingPayment" 
                value={formData.housingPayment} 
                onChange={handleChange} 
                placeholder="Ej: 5000"
              />
              {/* Mensaje de error dinámico */}
              {housingPaymentError && <span className="error-text-small">{housingPaymentError}</span>}
            </div>
            <button type="submit" className="btn-calculate">Calcular</button>
          </form>
  
          {/* LADO DERECHO: Resultados */}
          <div className="results-section">
            <h2>Tus resultados:</h2>
            {result ? (
              <div className="results-list">
                <p>Necesidades (50-55%): <span>{formatter.format(result.needs_budget)}</span></p>
                <p>Deseos (30-25%): <span>{formatter.format(result.wants_budget)}</span></p>
                <p>Ahorro (20%): <span>{formatter.format(result.savings_budget)}</span></p>
              </div>
            ) : (
              <p className="placeholder-text">Ingresa tus datos para ver el cálculo</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App