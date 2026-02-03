import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuramos dotenv para que busque el .env un nivel arriba
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { createClient } from '@supabase/supabase-js'

const url = process.env.DB_URL
const key = process.env.DB_KEY

export const db = createClient(url, key)