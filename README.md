# Byraz – Planificador Financiero Inteligente
Byraz es una aplicación web diseñada para ayudar a los usuarios a tomar el control de sus finanzas personales utilizando la metodología 50/30/20. La plataforma permite calcular de forma instantánea cómo distribuir los ingresos mensuales netos entre necesidades básicas, gastos personales y ahorro, considerando variables específicas como el tipo y costo de vivienda.

Rol: Fullstack Developer
Stack: React (Vite), Node.js (Express), PostgreSQL (Supabase).

## Tecnologías usadas
- React
- Tailwind CSS
- Vite
- Supabase
- express
- axios
- helmet

## Estructura del proyecto
El proyecto se compone de dos partes backend/frontend:

```
Byraz
├── backend/              # Scripts de Node.js o lógica de servidor pesada
│   ├── config/
│   │   └── database.js   # Configuración de la conexión
│   └── services/         # Calcula y guarda las finanzas
├── frontend/             # App de React
│   ├── node_modules/     # Dependencias de Node.js
│   ├── public/           # Archivos estáticos
│   └── src/
│       ├── assets/       # Imagenes para la aplicación
│       ├── services/     # Lógica para hablar con la BD
│       ├── App.css       # CSS/Tailwind
│       ├── App.jsx       # Construccion de nuestra aplicación
│       ├── index.css
│       └── main.js
├── .env                  
└── README.md
```

## Instalaciones del proyecto

1. Clona este repositorio
2. Instala las dependenciasn (en Backend):
   ```bash
   npm install
   npm init -y                                          # Solo si aún no tienes un archivo package.json
   npm install @supabase/supabase-js dotenv             # En este caso utilizo una BD supabase
   npm install express                                  # framework para Node.js
   npm install cors                                     # Para configuracion de CORS
   ```
   **Asegurate de tener "type": "module" dentro de tu package.json**
3. Instala en la carpeta Raiz:
   ```bash
   npm create vite@latest frontend -- --template react  # Para crear nuestro frontend
   cd frontend
   npm install
   npm install axios                                    # Para hacer las peticiones al servidor de Express de forma sencilla
   npm run dev
   ```
4. Ejecuta el proyecto:
   ```bash
   node index.js                                        # En una terminal ejecutamos en el backend
   npm run dev                                          # En otra terminal ejecutamos para el frontend
   ```
   El sistema usa el **puerto 3000** para la API y el **5173** para la interfaz, la comunicación entre ambos está protegida por **CORS** y **Helmet**.
## Estructura de la tabla SQL
```
CREATE TABLE financial_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  net_income numeric NOT NULL,
  housing_type text CHECK (housing_type IN ('rent', 'mortgage', 'owned')),
  housing_payment numeric DEFAULT 0,
  needs_budget numeric,
  wants_budget numeric,
  savings_budget numeric
);
```